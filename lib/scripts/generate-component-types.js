import { execSync } from 'child_process';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '../dist');

// Generate types for components using tsc
try {
  console.log('Generating component types...');
  execSync('npx tsc --project tsconfig.lib.json --declaration --emitDeclarationOnly', {
    cwd: join(__dirname, '..'),
    stdio: 'inherit'
  });
  console.log('Component types generated successfully');
} catch (error) {
  console.error('Error generating types:', error.message);
  process.exit(1);
}
