#!/usr/bin/env node

/**
 * Connecteur Pennylane — Envoi de devis
 *
 * Ce script reçoit un devis structuré en JSON (stdin ou fichier)
 * et l'envoie à l'API Pennylane pour créer un estimate.
 *
 * Usage:
 *   echo '{"client_name":"Acme",...}' | node pennylane-send.js
 *   node pennylane-send.js --file devis.json
 *   node pennylane-send.js --dry-run --file devis.json
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
Connecteur Pennylane — Envoi de devis

Usage:
  echo '<json>' | node pennylane-send.js
  node pennylane-send.js -f devis.json
  node pennylane-send.js --dry-run -f devis.json

Le JSON attendu :
{
  "client_name": "Nom du client",
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

  // Lire stdin
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
// Pennylane API
// ---------------------------------------------------------------------------

function buildPennylanePayload(quote, config) {
  const agency = config.agency;

  return {
    estimate: {
      title: quote.project_title,
      currency: agency.default_currency || "EUR",
      customer_name: quote.client_name,
      notes: quote.notes || "",
      validity_days: agency.validity_days || 30,
      payment_conditions: agency.payment_conditions || "",
      line_items: quote.line_items.map((item, i) => ({
        label: item.title,
        description: item.description || "",
        quantity: item.quantity,
        unit: item.unit || "forfait",
        currency_amount: item.unit_price_ht,
        vat_rate: agency.default_tva_rate || 20,
        sort_order: i + 1,
      })),
    },
  };
}

async function sendToPennylane(payload, config) {
  const body = JSON.stringify(payload);
  const url = new URL(`${config.pennylane.api_url}/customer_estimates`);

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: url.hostname,
        path: url.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.pennylane.api_token}`,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode >= 300) {
            return reject(new Error(`Pennylane ${res.statusCode}: ${data}`));
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

  const quote = await readInput(opts);

  // Validation minimale
  if (!quote.line_items || !Array.isArray(quote.line_items) || quote.line_items.length === 0) {
    console.error("Le JSON doit contenir un tableau line_items non vide.");
    process.exit(1);
  }

  const payload = buildPennylanePayload(quote, config);

  if (opts.dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const result = await sendToPennylane(payload, config);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(`Erreur : ${err.message}`);
  process.exit(1);
});
