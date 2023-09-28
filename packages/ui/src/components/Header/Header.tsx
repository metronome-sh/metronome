import { Link } from '@remix-run/react';
import { type FunctionComponent } from 'react';

import { Icon } from '#/index';

import { Brand, Button } from '..';
// import { Switcher } from '~/components/Switcher';
// import { UserMenu } from '~/components/UserMenu';
// import { Brand } from '~/components/ui/Brand';
// import { useUser } from '~/hooks/useUser';

export const Header: FunctionComponent = () => {
  // const user = useUser();

  return (
    <div className="flex w-full py-2">
      <div className="flex flex-col-reverse md:flex-row justify-between w-full gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-1">
          <div className="hidden md:block">
            <Brand.Logo />
          </div>
          {/* <Icon.ChevronRight
            strokeWidth={2}
            className="stroke-muted-foreground"
          />
          <Button
            size="sm"
            variant="ghost"
            className="text-sm transition-colors hover:text-primary hover:bg-muted px-2 py-1 rounded-md space-x-2"
          >
            <div className="h-4 w-4 bg-zinc-500 rounded-full" />
            <span>Metronome</span>
            <span>
              <Icon.CaretDownFilled className="opacity-40" />
            </span>
          </Button> */}
          <Icon.ChevronRight
            strokeWidth={2}
            className="stroke-muted-foreground"
          />
          <Button
            size="sm"
            variant="ghost"
            className="text-sm transition-colors hover:text-primary hover:bg-muted px-2 py-1 rounded-md space-x-2"
          >
            <div className="h-4 w-4 bg-zinc-500 rounded-full" />
            <span>Awesome Project</span>
            <Icon.CaretDownFilled className="opacity-40" />
          </Button>
          {/* <Switcher.Team
            groups={[
              {
                label: 'Personal Account',
                teams: [{ value: 'personal', label: user.name, avatar: user.picture || '' }],
              },
            ]}
          /> */}
          <div className="hidden md:block">
            {/* <FontAwesomeIcon className="text-base text-zinc-600" icon={faSlashForward} /> */}
          </div>
          {/* <Switcher.Project /> */}
        </div>
        <div className="flex justify-between gap-4 border-b md:border-none pb-2 md:pb-0">
          <div className="md:hidden">
            <Brand.Logo />
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              // to="/docs"
              className="text-sm transition-colors hover:text-primary hover:bg-muted px-2 py-1 rounded-md space-x-1"
              asChild
            >
              <a
                href="https://github.com/metronome-sh/metronome-sh/issues/new?assignees=ErickTamayo&labels=feature-request&projects=&template=feature_request.md&title=%5BFEATURE+REQUEST%5D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon.SquaresFilled />
                <span>Feedback</span>
              </a>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-sm transition-colors hover:text-primary hover:bg-muted px-2 py-1 rounded-md space-x-1"
              asChild
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/metronome-sh/metronome-sh/issues/new?assignees=ErickTamayo&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D"
              >
                <Icon.Bug />
                <span>Report bug</span>
              </a>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-sm transition-colors hover:text-primary hover:bg-muted px-2 py-1 rounded-md space-x-1"
              asChild
            >
              <Link to="/docs">
                <Icon.FileText />
                <span>Documentation</span>
              </Link>
            </Button>
            {/* <a
              className="text-sm transition-colors hover:text-primary hover:bg-muted px-2 py-1 rounded-md"
              href="https://github.com/metronome-sh/metronome-sh/issues/new?assignees=ErickTamayo&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D"
              target="_blank"
              rel="noopener noreferrer"
            > */}
            {/* <FontAwesomeIcon icon={faBug} className="pr-1" /> Report a bug */}
            {/* </a> */}
            {/* <UserMenu /> */}
            <div>
              <div className="h-6 w-6 bg-zinc-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
