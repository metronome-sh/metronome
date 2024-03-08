import { FunctionComponent, useEffect, useState } from 'react';
import { useErrorHashLoaderData } from '../hooks/useErrorHashLoaderData';
import { Icon } from '#app/components/Icon';
import { cn } from '#app/components/utils';
import { type StackTraceSource } from '@metronome/db';

export const Code: FunctionComponent = () => {
  const {
    error: { sources },
  } = useErrorHashLoaderData();

  return (
    <div className="md:px-4 space-y-2">
      {sources.map((source) => {
        const { code } = source;

        if (!code) {
          return <NoSourceMapDescription key={source.at} source={source} />;
        }

        return (
          <div>
            <div className="flex items-center justify-between rounded-t-lg border bg-muted/50 py-2 pl-4 pr-2 overflow-x-scroll">
              <span className="text-sm tracking-wide text-white/80 flex items-center gap-1">
                <Icon.FileText />
                <span className="font-mono">
                  {source.source?.replace(/\.\.\//g, '')}
                  <span className="ml-1 text-xs opacity-50">({source.filename})</span>
                </span>
              </span>
            </div>
            <div className="rounded-b-lg border border-t-0 bg-background font-mono text-sm">
              <div
                className="*:py-3 *:!bg-transparent bg-zinc-900 w-full *:w-full overflow-scroll [&>pre]:w-full [&>pre]:min-w-fit rounded-b-lg"
                data-error-code-container={source.filename}
                dangerouslySetInnerHTML={{ __html: code }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const NoSourceMapDescription: FunctionComponent<{ source: StackTraceSource }> = ({ source }) => {
  const normalizedAtRegex = /.*node_modules(.*)/;
  const match = source.at?.match(normalizedAtRegex);

  const parsedAt = match ? `node_modules${match[1]}` : source.at;

  return (
    <div className="opacity-40 text-sm border px-2 py-1 rounded-lg">
      {parsedAt} ({source.entries[0].lineNumber}:{source.entries[0].column})
    </div>
  );
};
