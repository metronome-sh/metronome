import { context } from 'esbuild';
import { esbuildConfigCjs, esbuildConfigEsm } from './esbuild.mjs';

const esmContext = await context(esbuildConfigEsm);

const cjsContext = await context(esbuildConfigCjs);

await Promise.all([esmContext.rebuild(), cjsContext.rebuild()]);

await Promise.all([esmContext.watch(), cjsContext.watch()]);
