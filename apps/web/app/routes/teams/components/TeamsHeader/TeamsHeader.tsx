import { UIMatch, useMatches } from '@remix-run/react';
import { FunctionComponent, ReactNode, useMemo } from 'react';

import { Header } from '#app/components';

import { ProjectSelector } from '../ProjectSelector';

export const TeamsHeader: FunctionComponent = () => {
  const matches = useMatches();

  const breadcrumb = useMemo(() => {
    const breadcrumbGetters = {
      '$teamSlug.create': () => 'Create Project',
      '$teamSlug.$projectSlug': () => <ProjectSelector />,
      '$teamSlug.$projectSlug.overview': () => <span>Overview</span>,
      '$teamSlug.$projectSlug.settings': () => <span>Settings</span>,
      '$teamSlug.$projectSlug.web-analytics': () => <span>Web Analytics</span>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as Record<string, (match: UIMatch<any, any>) => ReactNode>;

    const items = matches
      .filter((m) => m.id !== 'root')
      .map((match) => {
        const getter = breadcrumbGetters[match.id];

        if (!getter) return null;

        return getter(match);
      })
      .filter(Boolean) as ReactNode[];

    return items;
  }, [matches]);

  return <Header breadcrumb={breadcrumb} />;
};
