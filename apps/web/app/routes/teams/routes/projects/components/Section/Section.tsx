import { type FunctionComponent, type PropsWithChildren } from 'react';

import { cn } from '#app/components';

import { SectionTitle } from './Section.Title';

export type SectionProps = PropsWithChildren<{
  className?: string;
}>;

export const Section: FunctionComponent<SectionProps> & {
  Title: typeof SectionTitle;
} = ({ className, children }) => {
  return <div className={cn(className)}>{children}</div>;
};

Section.Title = SectionTitle;
