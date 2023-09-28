export * from './components';
export * as Icon from './icons';

// Force Remix to generate a different build ID
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ___METRONOME_DIFF___ = process.env.METRONOME_DIFF;
