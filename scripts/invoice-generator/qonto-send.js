#!/usr/bin/env node

/**
 * Connecteur Qonto — Envoi de devis (client invoices)
 *
 * Ce script reçoit un devis structuré en JSON (stdin ou fichier)
 * et l'envoie à l'API Qonto pour créer une facture client (client invoice).
 *
 * Usage:
 *   echo '{"client_name":"Acme",...}' | node qonto-send.js
 *   node qonto-send.js --file devis.json
 *   node qonto-send.js --dry-run --file devis.json
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const CONFIG_PATH =
  process.env.QUOTE_CONFIG || path.join(__dirname, "config.json");

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Fichier de configuration introuvable : ${CONFIG_PATH}`);
    console.error(`Copiez config.example.json vers config.json et renseignez vos clés.`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = { dryRun: false, file: null };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--dry-run":
        opts.dryRun = true;
        break;
      case "--file":
      case "-f":
        opts.file = args[++i];
        break;
      case "--help":
      case "-h":
        console.log(`
Connecteur Qonto — Envoi de devis

Usage:
  echo '<json>' | node qonto-send.js
  node qonto-send.js -f devis.json
  node qonto-send.js --dry-run -f devis.json

Le JSON attendu :
{
  "client_name": "Nom du client",
  "client_email": "client@example.com",
  "project_title": "Titre du projet",
  "line_items": [
    { "title": "Poste", "description": "...", "quantity": 1, "unit": "forfait", "unit_price_ht": 1500 }
  ],
  "notes": "Optionnel"
}
`);
        process.exit(0);
    }
  }
  return opts;
}

// ---------------------------------------------------------------------------
// Lecture du JSON d'entrée (fichier ou stdin)
// ---------------------------------------------------------------------------

async function readInput(opts) {
  if (opts.file) {
    return JSON.parse(fs.readFileSync(opts.file, "utf-8"));
  }

  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(new Error(`JSON stdin invalide : ${e.message}`));
      }
    });
    process.stdin.on("error", reject);
  });
}

// ---------------------------------------------------------------------------
// Qonto API
// ---------------------------------------------------------------------------

function buildQontoPayload(quote, config) {
  const agency = config.agency;
  const tvaRate = agency.default_tva_rate || 20;

  const items = quote.line_items.map((item) => {
    const unitPrice = item.unit_price_ht;
    const vatAmount = unitPrice * item.quantity * (tvaRate / 100);

    return {
      title: item.title,
      description: item.description || "",
      quantity: String(item.quantity),
      unit_price: {
        value: String(unitPrice),
        currency: agency.default_currency || "EUR",
      },
      vat_rate: String(tvaRate),
      vat_amount: {
        value: String(vatAmount.toFixed(2)),
        currency: agency.default_currency || "EUR",
      },
    };
  });

  const totalHT = quote.line_items.reduce(
    (sum, item) => sum + item.quantity * item.unit_price_ht,
    0
  );
  const totalVAT = totalHT * (tvaRate / 100);
  const totalTTC = totalHT + totalVAT;
  const currency = agency.default_currency || "EUR";

  return {
    client_invoice: {
      client_name: quote.client_name,
      client_email: quote.client_email || null,
      title: quote.project_title,
      description: quote.notes || "",
      currency: currency,
      total_amount: {
        value: String(totalTTC.toFixed(2)),
        currency: currency,
      },
      total_excluding_vat: {
        value: String(totalHT.toFixed(2)),
        currency: currency,
      },
      total_vat: {
        value: String(totalVAT.toFixed(2)),
        currency: currency,
      },
      items: items,
      payment_conditions: agency.payment_conditions || "",
    },
  };
}

async function sendToQonto(payload, config) {
  const body = JSON.stringify(payload);
  const url = new URL(`${config.qonto.api_url}/client_invoices`);

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: url.hostname,
        path: url.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${config.qonto.organization_slug}:${config.qonto.secret_key}`,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode >= 300) {
            return reject(new Error(`Qonto ${res.statusCode}: ${data}`));
          }
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve({ raw: data });
          }
        });
      }
    );
    req.on("error", reject);
    req.end(body);
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs(process.argv);
  const config = loadConfig();

  if (!config.qonto || !config.qonto.secret_key || config.qonto.secret_key === "VOTRE_SECRET_KEY_QONTO") {
    console.error("Configuration Qonto manquante dans config.json.");
    process.exit(1);
  }

  const quote = await readInput(opts);

  if (!quote.line_items || !Array.isArray(quote.line_items) || quote.line_items.length === 0) {
    console.error("Le JSON doit contenir un tableau line_items non vide.");
    process.exit(1);
  }

  const payload = buildQontoPayload(quote, config);

  if (opts.dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const result = await sendToQonto(payload, config);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(`Erreur : ${err.message}`);
  process.exit(1);
});
