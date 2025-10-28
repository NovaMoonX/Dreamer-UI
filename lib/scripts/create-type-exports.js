import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '../dist');

// Create entry point d.ts files that re-export from subdirectories
const entries = ['components', 'hooks', 'providers', 'symbols', 'utils'];

entries.forEach(entry => {
  const content = `export * from './${entry}/index';\n`;
  writeFileSync(join(distPath, `${entry}.d.ts`), content);
  console.log(`Created ${entry}.d.ts`);
});

console.log('Type export files created successfully');
