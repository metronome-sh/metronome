import { projects } from '@metronome/db.server';

await projects.rotateSalts();

console.log('Projects salt rotated.');

process.exit(0);
