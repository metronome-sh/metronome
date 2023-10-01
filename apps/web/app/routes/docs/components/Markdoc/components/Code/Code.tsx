import clsx from 'clsx';
import { FunctionComponent } from 'react';

export type CodeProps = {
  content: string;
  className?: string;
};

export const Code: FunctionComponent<CodeProps> = ({ content, className }) => {
  return (
    <div className={clsx('inline-block', className)}>
      <pre className="rounded-md border bg-background px-1 text-sm leading-5">
        {content}
      </pre>
    </div>
  );
};
