#!/usr/bin/env node

/**
 * Générateur de devis pour agence web
 *
 * Usage:
 *   node generate-quote.js "Refonte du site e-commerce pour client allemand, budget ~15k€"
 *   node generate-quote.js --client "Acme Corp" --lang fr "Site vitrine 5 pages avec blog"
 *   node generate-quote.js --dry-run "Application mobile React Native"
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const CONFIG_PATH =
  process.env.QUOTE_CONFIG ||
  path.join(__dirname, "config.json");

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(
      `\n❌  Fichier de configuration introuvable : ${CONFIG_PATH}`
    );
    console.error(
      `   Copiez config.example.json → config.json et renseignez vos clés.\n`
    );
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = { dryRun: false, client: null, lang: null, prompt: "" };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--dry-run":
        opts.dryRun = true;
        break;
      case "--client":
        opts.client = args[++i];
        break;
      case "--lang":
        opts.lang = args[++i];
        break;
      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
        break;
      default:
        opts.prompt = args[i];
    }
  }

  if (!opts.prompt) {
    console.error("\n❌  Veuillez fournir une description du projet.\n");
    printHelp();
    process.exit(1);
  }
  return opts;
}

function printHelp() {
  console.log(`
Générateur de devis — Agence Web
─────────────────────────────────

Usage:
  node generate-quote.js [options] "description du projet"

Options:
  --client "Nom"   Nom du client (sinon détecté depuis le prompt)
  --lang   fr|en|de|…  Langue du devis (sinon détectée depuis le prompt)
  --dry-run        Affiche le devis sans l'envoyer à Pennylane
  -h, --help       Affiche cette aide

Exemples:
  node generate-quote.js "Site vitrine 5 pages pour un restaurant"
  node generate-quote.js --client "BMW" --lang de "Refonte e-commerce 200 produits"
  node generate-quote.js --dry-run "Application mobile de livraison"
`);
}

// ---------------------------------------------------------------------------
// Anthropic — génération du devis structuré
// ---------------------------------------------------------------------------

function buildSystemPrompt(agency) {
  return `Tu es un assistant de devis pour l'agence web "${agency.name}".

RÔLE : À partir d'une description de projet, tu produis un devis structuré en JSON.

RÈGLES :
1. Écris le devis DANS LA LANGUE DU CLIENT (détecte-la depuis le prompt ou utilise celle indiquée).
2. Utilise un langage pédagogique, simple, sans jargon technique.
3. Une ligne par grand poste opérationnel (pas de sous-détails).
   Exemples de postes : "Conception et maquettes", "Développement du site",
   "Intégration du contenu", "Mise en ligne et tests", "Formation à l'utilisation".
4. Chaque ligne a : un titre clair, une description courte (1 phrase), une quantité, un prix unitaire HT.
5. Sois réaliste sur les prix (tarif agence web française).
6. Si le budget est mentionné, ajuste les postes pour rester dans l'enveloppe.

RÉPONSE OBLIGATOIRE en JSON strict (rien d'autre) :

{
  "client_name": "Nom du client ou 'À définir'",
  "language": "code ISO 639-1 (fr, en, de, es…)",
  "project_title": "Titre court du projet",
  "line_items": [
    {
      "title": "Intitulé du poste",
      "description": "Explication simple en 1 phrase",
      "quantity": 1,
      "unit": "forfait | jour | page | écran",
      "unit_price_ht": 1500.00
    }
  ],
  "notes": "Note optionnelle pour le client (conditions, délais…)"
}`;
}

async function callAnthropic(apiKey, systemPrompt, userPrompt) {
  const body = JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.anthropic.com",
        path: "/v1/messages",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode !== 200) {
            return reject(
              new Error(`Anthropic API ${res.statusCode}: ${data}`)
            );
          }
          try {
            const json = JSON.parse(data);
            const text = json.content?.[0]?.text || "";
            resolve(text);
          } catch (e) {
            reject(new Error(`Réponse Anthropic invalide: ${e.message}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.end(body);
  });
}

// ---------------------------------------------------------------------------
// Pennylane — création du devis
// ---------------------------------------------------------------------------

async function createPennylaneEstimate(config, quote, agency) {
  const tvaRate = agency.default_tva_rate / 100;

  const lineItems = quote.line_items.map((item, i) => ({
    label: item.title,
    description: item.description,
    quantity: item.quantity,
    unit: item.unit,
    currency_amount: item.unit_price_ht,
    vat_rate: agency.default_tva_rate,
    sort_order: i + 1,
  }));

  const body = JSON.stringify({
    estimate: {
      title: quote.project_title,
      currency: agency.default_currency,
      line_items: lineItems,
      customer_name: quote.client_name,
      notes: quote.notes || "",
      validity_days: agency.validity_days,
      payment_conditions: agency.payment_conditions,
    },
  });

  return new Promise((resolve, reject) => {
    const url = new URL(`${config.pennylane.api_url}/customer_estimates`);
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
            return reject(
              new Error(`Pennylane API ${res.statusCode}: ${data}`)
            );
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
// Affichage console
// ---------------------------------------------------------------------------

function printQuote(quote, agency) {
  const totalHT = quote.line_items.reduce(
    (sum, item) => sum + item.quantity * item.unit_price_ht,
    0
  );
  const tva = totalHT * (agency.default_tva_rate / 100);
  const totalTTC = totalHT + tva;

  const lang = quote.language || "fr";
  const labels = {
    fr: { quote: "DEVIS", qty: "Qté", unit: "Unité", pu: "Prix unit. HT", total: "Total HT", tva: "TVA", ttc: "Total TTC", notes: "Notes" },
    en: { quote: "QUOTE", qty: "Qty", unit: "Unit", pu: "Unit price", total: "Total excl. tax", tva: "VAT", ttc: "Total incl. tax", notes: "Notes" },
    de: { quote: "ANGEBOT", qty: "Menge", unit: "Einheit", pu: "Einzelpreis", total: "Netto", tva: "MwSt", ttc: "Brutto", notes: "Hinweise" },
    es: { quote: "PRESUPUESTO", qty: "Cant.", unit: "Unidad", pu: "Precio unit.", total: "Total sin IVA", tva: "IVA", ttc: "Total con IVA", notes: "Notas" },
  };
  const l = labels[lang] || labels.en;

  const sep = "═".repeat(70);
  const line = "─".repeat(70);

  console.log(`\n${sep}`);
  console.log(`  ${l.quote} — ${quote.project_title}`);
  console.log(`  ${agency.name}`);
  console.log(`  Client : ${quote.client_name}`);
  console.log(`  Langue : ${lang.toUpperCase()}`);
  console.log(sep);

  for (const item of quote.line_items) {
    const itemTotal = item.quantity * item.unit_price_ht;
    console.log(`\n  ● ${item.title}`);
    console.log(`    ${item.description}`);
    console.log(
      `    ${item.quantity} ${item.unit}  ×  ${fmt(item.unit_price_ht)} €  =  ${fmt(itemTotal)} €`
    );
  }

  console.log(`\n${line}`);
  console.log(`  ${l.total.padEnd(55)} ${fmt(totalHT).padStart(10)} €`);
  console.log(
    `  ${l.tva} (${agency.default_tva_rate}%)${" ".repeat(55 - l.tva.length - ` (${agency.default_tva_rate}%)`.length)}${fmt(tva).padStart(10)} €`
  );
  console.log(`  ${l.ttc.padEnd(55)} ${fmt(totalTTC).padStart(10)} €`);
  console.log(sep);

  if (quote.notes) {
    console.log(`\n  ${l.notes} : ${quote.notes}`);
  }
  console.log();
}

function fmt(n) {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs(process.argv);
  const config = loadConfig();
  const agency = config.agency;

  // Construire le prompt enrichi
  let userPrompt = opts.prompt;
  if (opts.client) userPrompt += `\nClient : ${opts.client}`;
  if (opts.lang) userPrompt += `\nLangue du devis : ${opts.lang}`;

  console.log("\n⏳ Génération du devis en cours…\n");

  // Appel Claude pour structurer le devis
  const raw = await callAnthropic(
    config.anthropic.api_key,
    buildSystemPrompt(agency),
    userPrompt
  );

  // Extraire le JSON (au cas où Claude ajoute du texte autour)
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("❌  Impossible de parser la réponse :", raw);
    process.exit(1);
  }

  const quote = JSON.parse(jsonMatch[0]);

  // Surcharger le client si fourni en CLI
  if (opts.client) quote.client_name = opts.client;
  if (opts.lang) quote.language = opts.lang;

  // Afficher le devis
  printQuote(quote, agency);

  // Envoyer à Pennylane (sauf dry-run)
  if (opts.dryRun) {
    console.log("ℹ️  Mode dry-run — devis non envoyé à Pennylane.\n");
    // Sauvegarder en local
    const outPath = path.join(
      __dirname,
      `devis-${Date.now()}.json`
    );
    fs.writeFileSync(outPath, JSON.stringify(quote, null, 2));
    console.log(`📄 Devis sauvegardé : ${outPath}\n`);
  } else {
    try {
      console.log("📤 Envoi vers Pennylane…");
      const result = await createPennylaneEstimate(config, quote, agency);
      console.log("✅ Devis créé dans Pennylane !");
      if (result.id) console.log(`   ID : ${result.id}`);
      if (result.url) console.log(`   URL : ${result.url}`);
    } catch (err) {
      console.error(`\n❌  Erreur Pennylane : ${err.message}`);
      // Sauvegarder en local en cas d'échec
      const outPath = path.join(__dirname, `devis-${Date.now()}.json`);
      fs.writeFileSync(outPath, JSON.stringify(quote, null, 2));
      console.log(`📄 Devis sauvegardé localement : ${outPath}\n`);
    }
  }
}

main().catch((err) => {
  console.error(`\n❌  Erreur : ${err.message}\n`);
  process.exit(1);
});
