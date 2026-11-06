import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entry = resolve(root, 'node_modules/decap-server/dist/index.js');
const child = spawn(process.execPath, [entry], {
  cwd: root,
  env: {
    ...process.env,
    BIND_HOST: '127.0.0.1',
    ORIGIN: 'http://localhost:4321',
    MODE: 'fs',
    PORT: '8081',
  },
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exitCode = code ?? 1;
});
