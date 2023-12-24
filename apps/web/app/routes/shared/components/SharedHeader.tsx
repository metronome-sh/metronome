import { Link } from '@remix-run/react';
import { type FunctionComponent } from 'react';

import { Brand, Button, Icon } from '#app/components';
// import { Breadcrumb, UserMenu } from '..';
// import { Brand } from '../Brand';
// import { Button } from '../Button';
// import { Icon } from '../Icon';

export const SharedHeader: FunctionComponent = () => {
  return (
    <div className="flex w-full py-3 px-4 dark:bg-black">
      <div className="flex flex-col-reverse md:flex-row justify-between w-full gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-1">
          <div className="hidden md:block">
            <Brand />
          </div>
        </div>
        <div className="flex justify-between gap-4 border-b md:border-none pb-2 md:pb-0">
          <div className="md:hidden">
            <Brand.Logo />
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-sm transition-colors hover:text-primary hover:bg-muted px-2 py-1 rounded-md space-x-1 group"
              asChild
            >
              <a
                className="hidden lg:block"
                href="https://github.com/metronome-sh/metronome-sh/issues/new?assignees=ErickTamayo&labels=feature-request&projects=&template=feature_request.md&title=%5BFEATURE+REQUEST%5D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon.SquaresFilled className="opacity-50 group-hover:opacity-70" />
                <span>Feedback</span>
              </a>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-sm transition-colors hover:text-primary hover:bg-muted px-2 py-1 rounded-md space-x-1 group"
              asChild
            >
              <a
                className="hidden lg:block"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/metronome-sh/metronome-sh/issues/new?assignees=ErickTamayo&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D"
              >
                <Icon.Bug className="opacity-50 group-hover:opacity-70" />
                <span>Report bug</span>
              </a>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-sm transition-colors hover:text-primary hover:bg-muted px-2 py-1 rounded-md space-x-1 group"
              asChild
            >
              <Link to="/docs">
                <Icon.FileText className="opacity-50 group-hover:opacity-70" />
                <span>Documentation</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
