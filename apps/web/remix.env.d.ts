/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

import type {
  MetronomeActionFunctionArgs as MetronomeActionFunctionArgsPrimitive,
  MetronomeLoaderFunctionArgs as MetronomeLoaderFunctionArgsPrimitive,
} from '@metronome/server';

declare global {
  type MetronomeActionFunctionArgs = MetronomeActionFunctionArgsPrimitive;
  type MetronomeLoaderFunctionArgs = MetronomeLoaderFunctionArgsPrimitive;
}
