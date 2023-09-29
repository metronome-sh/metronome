import { NavLink } from '@remix-run/react';
import { FunctionComponent, useMemo } from 'react';

import { Button, Icon, Separator, Tooltip } from '#app/components';
import { cn } from '#app/components/utils';
import { useTeamLoaderData } from '#app/routes/teams/hooks';

import { useTeamProjectLoaderData } from '../../hook';

export const Navigation: FunctionComponent = () => {
  const { team } = useTeamLoaderData();
  const { project } = useTeamProjectLoaderData();

  const navigation = useMemo(() => {
    return [
      {
        name: 'Overview',
        Icon: Icon.Home,
        to: `/${team.slug}/${project.slug}`,
        commingSoon: false,
      },
      {
        name: 'Web Analytics',
        Icon: Icon.World,
        to: `/${team.slug}/${project.slug}/web-analytics`,
        commingSoon: false,
      },
      {
        name: 'Web Vitals',
        Icon: Icon.Heartbeat,
        to: `/${team.slug}/${project.slug}/web-vitals`,
        commingSoon: true,
      },
      {
        name: 'Routes',
        Icon: Icon.RouteSquareTwo,
        to: `/${team.slug}/${project.slug}/routes`,
        commingSoon: true,
      },
      {
        name: 'Errors',
        Icon: Icon.TimelineEventExclamation,
        to: `/${team.slug}/${project.slug}/errors`,
        commingSoon: true,
      },
      {
        name: 'Lighthouse',
        Icon: Icon.BuildingLighthouse,
        to: `/${team.slug}/${project.slug}/lighthouse`,
        commingSoon: true,
      },
    ];
  }, [team, project]);

  return (
    <div className="w-50 pt-5">
      <div className="space-y-2">
        <Tooltip.Provider>
          {navigation.map((item) => {
            const button = (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full flex justify-start p-0"
                disabled={item.commingSoon}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive, isPending }) => {
                    return cn(
                      'flex gap-2 items-center justify-start w-full h-full rounded-md px-2 py-1',
                      {
                        'text-foreground bg-muted/50': isActive || isPending,
                      },
                    );
                  }}
                >
                  <item.Icon strokeWidth={1.5} className="w-5 h-5" />
                  <div className="text-sm">{item.name}</div>
                </NavLink>
              </Button>
            );

            return item.commingSoon ? (
              <Tooltip key={item.name}>
                <Tooltip.Trigger className="block w-full">
                  {button}
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>Coming Soon ✨</p>
                </Tooltip.Content>
              </Tooltip>
            ) : (
              button
            );
          })}
        </Tooltip.Provider>
      </div>
      <Separator className="my-4" />
      <Button variant="ghost" className="w-full flex justify-start p-0">
        <NavLink
          to={'/settings'}
          className={({ isActive, isPending }) => {
            return cn(
              'flex gap-2 items-center justify-start w-full h-full rounded-md px-2 py-1',
              {
                'text-foreground bg-muted/50': isActive || isPending,
              },
            );
          }}
        >
          <Icon.SettingsTwo strokeWidth={1.5} className="w-5 h-5" />
          <div className="text-sm">Settings</div>
        </NavLink>
      </Button>
    </div>
  );
};
