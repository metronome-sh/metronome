import { NavLink } from '@remix-run/react';
import { FunctionComponent } from 'react';

import { Button, Icon, Separator, Tooltip } from '#app/components';
import { cn } from '#app/components/utils';

const navigation = [
  {
    name: 'Overview',
    Icon: Icon.Home,
    to: '/teamSlug/projectSlug/overview',
    commingSoon: false,
  },
  {
    name: 'Web Analytics',
    Icon: Icon.World,
    to: '/web-analytics',
    commingSoon: false,
  },
  {
    name: 'Web Vitals',
    Icon: Icon.Heartbeat,
    to: '/web-vitals',
    commingSoon: true,
  },
  {
    name: 'Routes',
    Icon: Icon.RouteSquareTwo,
    to: '/routes',
    commingSoon: true,
  },
  {
    name: 'Errors',
    Icon: Icon.TimelineEventExclamation,
    to: '/errors',
    commingSoon: true,
  },
  {
    name: 'Lighthouse',
    Icon: Icon.BuildingLighthouse,
    to: '/lighthouse',
    commingSoon: true,
  },
] as const;

export const Navigation: FunctionComponent = () => {
  // const app = useApp();

  return (
    <div className="w-65 pt-14">
      <div className="space-y-2">
        <Tooltip.Provider>
          {navigation.map((item) => {
            const button = (
              <Button
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
                <Tooltip.Trigger className="block">{button}</Tooltip.Trigger>
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
