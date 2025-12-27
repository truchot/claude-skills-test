import { readdir, readFile, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Résout un chemin relatif au skill
 */
export function resolvePath(...segments) {
  return join(__dirname, '..', ...segments);
}

/**
 * Vérifie si un fichier existe
 */
export async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Lit le contenu d'un fichier
 */
export async function readFileContent(path) {
  try {
    return await readFile(path, 'utf-8');
  } catch {
    return null;
  }
}

/**
 * Liste les fichiers d'un répertoire
 */
export async function listFiles(dir) {
  try {
    return await readdir(dir);
  } catch {
    return [];
  }
}

/**
 * Extrait le frontmatter YAML d'un fichier markdown
 */
export function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const yaml = match[1];
  const result = {};

  yaml.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      result[key.trim()] = valueParts.join(':').trim();
    }
  });

  return result;
}

/**
 * Compte le nombre total d'agents dans tous les domaines
 */
export async function countTotalAgents(basePath, domains) {
  let total = 0;

  for (const domain of domains) {
    const domainPath = join(basePath, domain);
    const files = await listFiles(domainPath);
    total += files.filter(f => f.endsWith('.md')).length;
  }

  return total;
}
