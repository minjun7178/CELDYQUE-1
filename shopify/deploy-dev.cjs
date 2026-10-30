// This entry point intentionally has no configurable store, theme or branch.
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const {execFileSync} = require('node:child_process');
const REPOSITORY = 'minjun7178/CELDYQUE-1';
const REF = 'refs/heads/codex/shopify-liquid-pilot';
const STORE = 'celdyque-dev-test.myshopify.com';
const THEME = '189650600047';

function assertContext(env) {
  assert.equal(env.GITHUB_ACTIONS, 'true', 'Run through the branch-restricted dev workflow');
  assert.equal(env.GITHUB_REPOSITORY, REPOSITORY, 'Wrong repository');
  assert.equal(env.GITHUB_REF, REF, 'Only the Shopify pilot branch may deploy');
  assert.equal(env.GITHUB_EVENT_NAME, 'push', 'Only branch pushes may deploy');
  assert(env.SHOPIFY_CLI_THEME_TOKEN?.trim(), 'Missing dev Theme Access credential');
}

function assertDraft(result) {
  assert(Array.isArray(result.themes), 'Unexpected theme list response');
  const matches = result.themes.filter(t => String(t.id) === THEME);
  assert.equal(matches.length, 1, 'Exact dev preview theme must exist');
  assert.equal(matches[0].role, 'unpublished', 'Refusing to upload to a published theme');
  assert.equal(matches[0].processing, false, 'Target theme is still processing');
  return matches[0];
}

function pushArgs() {
  return ['theme', 'push', '--store', STORE, '--theme', THEME,
    '--path', path.join(__dirname, 'theme'), '--strict', '--no-input', '--json'];
}

function deploy() {
  assertContext(process.env);
  const env = {...process.env, CI: 'true', SHOPIFY_CLI_NO_ANALYTICS: '1'};
  // Explicit arguments are the only targets. Discard ambient CLI flag overrides.
  for (const key of Object.keys(env)) if (key.startsWith('SHOPIFY_FLAG_')) delete env[key];
  const run = args => execFileSync('shopify', args, {
    cwd: __dirname, env, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'inherit']
  });
  const list = () => assertDraft(JSON.parse(run(['theme', 'list', '--store', STORE, '--json', '--no-input'])));
  list();
  const backup = path.join(__dirname, 'evidence', 'ci-before-theme');
  fs.mkdirSync(backup, {recursive: true});
  run(['theme', 'pull', '--store', STORE, '--theme', THEME, '--path', backup, '--no-input']);
  // Check again after backup. CLI also refuses a live push without --allow-live.
  list();
  const result = JSON.parse(run(pushArgs()));
  assert.equal(String(result.theme?.id), THEME, 'Unexpected uploaded theme');
  assert.equal(result.theme?.role, 'unpublished', 'Uploaded theme must remain unpublished');
  console.log(`Updated only ${STORE}, draft theme ${THEME}.`);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,
    `## Dev preview updated\n\nCommit: ${process.env.GITHUB_SHA}\n\n[Open preview](https://${STORE}/?preview_theme_id=${THEME})\n\nProduction, main, products, payments and fulfillment were not modified by this workflow.\n`);
}

module.exports = {assertContext, assertDraft, pushArgs};
if (require.main === module) deploy();
