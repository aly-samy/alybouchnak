import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import vm from 'node:vm';
import { Octokit } from '@octokit/rest';
import { secureCompare } from '../netlify/functions/utils/security.ts';
import fs from 'node:fs';

function loadHandler(name) {
  const { outputText } = ts.transpileModule(fs.readFileSync(`netlify/functions/${name}.ts`, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  const require = name => {
    if (name === './utils/security.js') return { secureCompare };
    if (name === '@octokit/rest') return { Octokit };
    if (name === '../../src/db/index.js') return { db: {} };
    if (name === '../../src/db/schema.js') return { subscribers: {} };
    if (name === 'drizzle-orm') return { eq: () => { throw new Error('Unauthorized database access'); } };
    throw new Error(`Unexpected dependency: ${name}`);
  };
  vm.runInNewContext(outputText, { exports, require, process, Buffer, console }, { timeout: 5000 });
  return exports.handler;
}
const handler = loadHandler('admin-login');
const original = process.env.ADMIN_PASSWORD;
test('admin login fails closed without server configuration', async () => {
  delete process.env.ADMIN_PASSWORD;
  assert.equal((await handler({ httpMethod: 'POST', headers: {} })).statusCode, 401);
});
test('admin login validates the supplied password on the server', async () => {
  process.env.ADMIN_PASSWORD = 'test-only-password';
  assert.equal((await handler({ httpMethod: 'POST', headers: { authorization: 'Bearer wrong' } })).statusCode, 401);
  const result = await handler({ httpMethod: 'POST', headers: { authorization: 'Bearer test-only-password' } });
  assert.equal(result.statusCode, 200);
  assert.equal(result.headers['Cache-Control'], 'no-store');
  assert.equal((await handler({ httpMethod: 'GET', headers: {} })).statusCode, 405);
});
test('GitHub writes require authentication before any API request', async () => {
  const github = loadHandler('github-crud');
  assert.equal((await github({ httpMethod: 'POST', headers: {}, body: '{}' })).statusCode, 401);
});
test('subscriber administrative updates and ID deletion require authentication', async () => {
  const subscribe = loadHandler('subscribe');
  for (const event of [
    { httpMethod: 'PUT', body: JSON.stringify({ email: 'test@example.invalid', status: 'active' }) },
    { httpMethod: 'DELETE', body: JSON.stringify({ email: 'test@example.invalid', id: 1 }) },
    { httpMethod: 'DELETE', body: JSON.stringify({ email: 'test@example.invalid' }), queryStringParameters: { id: '1' } },
  ]) assert.equal((await subscribe({ headers: {}, ...event })).statusCode, 401);
});
test.after(() => {
  if (original === undefined) delete process.env.ADMIN_PASSWORD;
  else process.env.ADMIN_PASSWORD = original;
});
