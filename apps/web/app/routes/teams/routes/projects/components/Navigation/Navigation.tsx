import { NavLink } from '@remix-run/react';
import { FunctionComponent, useMemo } from 'react';

import { Icon, ScrollArea, Tooltip } from '#app/components';
import { buttonVariants } from '#app/components/Button';
import { cn } from '#app/components/utils';
import { useTeamLoaderData } from '#app/routes/teams/hooks';

import { useTeamProjectLoaderData } from '../../hooks';

export const Navigation: FunctionComponent = () => {
  const { team } = useTeamLoaderData();
  const { project } = useTeamProjectLoaderData();

  const navigation = useMemo(() => {
    return [
      {
        name: 'Overview',
        Icon: Icon.Home,
        to: `/${team.slug}/${project.slug}/overview`,
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
    <div className="relative w-full md:pt-5 md:pb-1 px-4 border-b bg-black">
      <ScrollArea className="h-10">
        <ScrollArea.ScrollBar orientation="horizontal">
          <ScrollArea.Thumb className="hidden" />
        </ScrollArea.ScrollBar>
        <div className="flex gap-2">
          <Tooltip.Provider>
            {navigation.map((item) => {
              const markup = (
                <>
                  <item.Icon
                    strokeWidth={1.5}
                    className="w-5 h-5 opacity-50 group-[.active]:opacity-70 mr-2"
                  />
                  <div className="text-sm whitespace-nowrap group-[.active]:text-foreground">
                    {item.name}
                  </div>
                  <div className="h-[2px] group-[.active]:bg-teal-500 absolute inset-x-0 -bottom-1 rounded-full"></div>
                </>
              );

              if (item.commingSoon) {
                return (
                  <Tooltip key={item.name} delayDuration={0}>
                    <Tooltip.Trigger asChild>
                      <div
                        className={cn(
                          buttonVariants({ variant: 'ghost' }),
                          'group relative px-2 opacity-50 cursor-default',
                        )}
                      >
                        {markup}
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <p>Coming Soon! 🚀</p>
                    </Tooltip.Content>
                  </Tooltip>
                );
              }

              if (project.isNew && item.name !== 'Overview') {
                return (
                  <div
                    key={item.name}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'group relative px-2 opacity-50 cursor-default',
                    )}
                  >
                    {markup}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.name}
                  prefetch="intent"
                  to={item.to}
                  className={({ isActive, isPending }) => {
                    return cn(buttonVariants({ variant: 'ghost' }), 'group relative px-2', {
                      'group active': isActive || isPending,
                    });
                  }}
                >
                  {markup}
                </NavLink>
              );
            })}
          </Tooltip.Provider>
          <NavLink
            prefetch="intent"
            to={`/${team.slug}/${project.slug}/settings`}
            className={({ isActive, isPending }) => {
              return cn(buttonVariants({ variant: 'ghost' }), 'group relative px-2', {
                'group active': isActive || isPending,
              });
            }}
          >
            <Icon.Settings
              strokeWidth={1.5}
              className="w-5 h-5 opacity-50 group-[.active]:opacity-70 mr-2"
            />
            <div className="text-sm whitespace-nowrap group-[.active]:text-foreground">
              Settings
            </div>
            <div className="h-[2px] group-[.active]:bg-teal-500 absolute inset-x-0 -bottom-1 rounded-full" />
          </NavLink>
        </div>
      </ScrollArea>
    </div>
  );
};
