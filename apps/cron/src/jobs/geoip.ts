import { ChildProcess, spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const command: string = 'pnpm';
const args: string[] = ['geoip:download'];

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const cwd = path.join(dirname, '../../../../packages/db.server');

const options = { cwd };

// Spawn the child process
const child: ChildProcess = spawn(command, args, options);

if (!child) {
  throw new Error('Could not spawn child process');
}

// Listen for stdout data
child.stdout?.on('data', (data: Buffer) => {
  console.log(`${data}`);
});

// Listen for stderr data
child.stderr?.on('data', (data: Buffer) => {
  console.error(`${data}`);
});

// Handle errors
child.on('error', (error: Error) => {
  console.error(`${error}`);
});

// Listen for the child process to exit
child.on('exit', (code: number) => {
  if (code === 0) {
    console.log('Child process completed successfully.');
  } else {
    console.error(`Child process exited with code ${code}`);
  }
});
