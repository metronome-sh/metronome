import { Project, Team } from '@metronome/db.server';
import { useMatches } from '@remix-run/react';
import { FunctionComponent, ReactNode, useMemo } from 'react';
import { invariant } from 'ts-invariant';

import { Header } from '#app/components';

import { ProjectSelector } from '../ProjectSelector';

const breadcrumbGetters = {
  $teamSlug: (data: { team?: Team }) => {
    invariant(data.team, 'Team not found');
    return data.team.name;
  },
  '$teamSlug.create': () => 'Create Project',
  '$teamSlug.$projectSlug': (data: { project?: Project }) => {
    invariant(data.project, 'Project not found');
    return data.project.name;
  },
} as Record<string, (data: unknown) => string>;

export const TeamsHeader: FunctionComponent = () => {
  const matches = useMatches();

  const breadcrumb = useMemo(() => {
    let items = matches
      .filter((m) => m.id !== 'root')
      .map((m) => {
        const getter = breadcrumbGetters[m.id];
        invariant(getter, `Breadcrumb getter not found for ${m.id}`);
        const value = getter(m.data);

        if (!value) return null;

        if (m.id === '$teamSlug.$projectSlug') return <ProjectSelector />;

        return (
          <div key={value} className="text-sm">
            {value}
          </div>
        );
      })
      .filter(Boolean) as ReactNode[];

    if (items.length < 2) {
      items = [
        ...items,
        <div key="overview" className="text-sm">
          Overview
        </div>,
      ];
    }

    return items;
  }, [matches]);

  return <Header breadcrumb={breadcrumb} />;
};
