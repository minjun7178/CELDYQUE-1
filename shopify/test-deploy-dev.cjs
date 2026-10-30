const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {assertContext, assertDraft, pushArgs} = require('./deploy-dev.cjs');
const allowed = {
  GITHUB_ACTIONS: 'true', GITHUB_REPOSITORY: 'minjun7178/CELDYQUE-1',
  GITHUB_REF: 'refs/heads/codex/shopify-liquid-pilot', GITHUB_EVENT_NAME: 'push',
  SHOPIFY_CLI_THEME_TOKEN: 'unit-test-placeholder'
};

test('main, unrelated branches, PRs, forks and local calls cannot deploy', () => {
  assert.doesNotThrow(() => assertContext(allowed));
  for (const patch of [
    {GITHUB_REF: 'refs/heads/main'}, {GITHUB_REF: 'refs/heads/another-branch'},
    {GITHUB_REF: 'refs/pull/1/merge'}, {GITHUB_EVENT_NAME: 'pull_request'},
    {GITHUB_REPOSITORY: 'other/fork'}, {GITHUB_ACTIONS: 'false'},
    {SHOPIFY_CLI_THEME_TOKEN: ''}
  ]) assert.throws(() => assertContext({...allowed, ...patch}));
});

test('only the exact existing, idle, unpublished theme is accepted', () => {
  const draft = {id: '189650600047', role: 'unpublished', processing: false};
  assert.doesNotThrow(() => assertDraft({themes: [draft]}));
  for (const theme of [
    {...draft, role: 'live'}, {...draft, role: 'main'},
    {...draft, id: '189644996719'}, {...draft, processing: true}
  ]) assert.throws(() => assertDraft({themes: [theme]}));
  assert.throws(() => assertDraft({themes: []}));
  assert.throws(() => assertDraft({themes: [draft, draft]}));
  assert.throws(() => assertDraft({}));
});

test('upload has fixed dev destination and cannot publish or allow a live upload', () => {
  const args = pushArgs();
  assert.equal(args[args.indexOf('--store') + 1], 'celdyque-dev-test.myshopify.com');
  assert.equal(args[args.indexOf('--theme') + 1], '189650600047');
  for (const flag of ['--publish', '--allow-live', '--live', '--unpublished']) assert(!args.includes(flag));
  assert(args.includes('--strict'));
  assert(args.includes('--no-input'));
});

test('workflow is branch-only, read-only, environment-scoped and has no production deployment', () => {
  const workflow = fs.readFileSync(path.join(__dirname, '../.github/workflows/shopify-dev.yml'), 'utf8');
  assert(workflow.includes("branches: ['codex/shopify-liquid-pilot']"));
  assert(!workflow.includes('pull_request:'));
  assert(!workflow.includes('workflow_dispatch:'));
  assert(workflow.includes('contents: read'));
  assert(workflow.includes('name: shopify-dev'));
  assert(!/pages: write|id-token: write|contents: write|deploy-pages|git push|git merge/.test(workflow));
});
