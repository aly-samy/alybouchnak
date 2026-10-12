import type { Handler } from '@netlify/functions';
import { secureCompare } from './utils/security.js';

export const handler: Handler = async event => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: '' };
  const headers = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json' };
  const secret = process.env.ADMIN_PASSWORD;
  const authorization = event.headers.authorization;
  if (!secret || !authorization || !secureCompare(authorization, `Bearer ${secret}`)) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
  }
  return { statusCode: 200, headers, body: JSON.stringify({ authenticated: true }) };
};
