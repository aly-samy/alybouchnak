import 'dotenv/config';
import { spawnSync } from 'node:child_process';

if (process.env.DATABASE_URL) {
  const result = spawnSync(process.execPath, ['--import', 'tsx', 'scripts/fetch-neon-data.ts'], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
} else {
  console.log('DATABASE_URL is absent; building from the checked-in content snapshot.');
}
// Preserve verified metadata even after the CMS regenerates the data modules.
const result = spawnSync(process.execPath, ['scripts/reconcile-catalog.js'], { stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status || 1);
const summaries = spawnSync(process.execPath, ['scripts/generate-catalog-summaries.js'], { stdio: 'inherit' });
process.exit(summaries.status || 0);
