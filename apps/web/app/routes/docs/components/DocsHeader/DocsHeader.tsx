import { Link } from '@remix-run/react';
import { type FunctionComponent } from 'react';

import { Brand, Button, UserMenu } from '#app/components';
import { useRootLoaderData } from '#app/hooks';

export const DocsHeader: FunctionComponent = () => {
  const { user } = useRootLoaderData();

  return (
    <div className="fixed top-0 inset-x-0 flex w-screen h-15 border-b bg-black z-50">
      <div className="flex flex-col-reverse md:flex-row justify-between w-full gap-4 pr-4 pl-8 bg-background/60">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-1">
          <div className="hidden md:block">
            <Brand />
          </div>
        </div>
        <div className="flex justify-between gap-4 border-b md:border-none pb-2 md:pb-0">
          <div className="md:hidden">
            <Brand.Logo />
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button asChild variant="outline">
                  <Link
                    to={`/${user.usersToTeams[0].team.slug}`}
                    className="text-sm transition-colors hover:text-primary hover:bg-muted px-3 py-2 rounded-md"
                  >
                    Dashboard
                  </Link>
                </Button>
                <UserMenu />
              </>
            ) : (
              <Link
                to="/authentication/grant"
                className="text-sm transition-colors hover:text-primary hover:bg-muted px-3 py-2 rounded-md"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// <>
//   <Link
//     to={`/${user.organizations[0].organizationId}`}
//     className="text-sm transition-colors hover:text-primary hover:bg-muted px-3 py-2 rounded-md"
//   >
//     Dashboard
//   </Link>
//   <UserMenu />
// </>
