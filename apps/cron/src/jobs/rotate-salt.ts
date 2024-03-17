import { projects } from '@metronome/db';

await projects.rotateSalts();

console.log('Projects salt rotated.');

process.exit(0);
