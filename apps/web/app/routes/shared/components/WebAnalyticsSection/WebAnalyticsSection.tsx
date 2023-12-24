import { type FunctionComponent } from 'react';

import { Section } from '#app/routes/teams/routes/projects/components';

import {
  BounceRate,
  SessionMedianDuration,
  TotalPageviews,
  TotalSessions,
  VisitorsRightNow,
} from './components';

export const WebAnalyticsSection: FunctionComponent = () => {
  return (
    <Section>
      <Section.Title title="Web Analytics" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-4">
        <VisitorsRightNow />
        <TotalSessions />
        <TotalPageviews />
        <SessionMedianDuration />
        <BounceRate />
      </div>
    </Section>
  );
};
