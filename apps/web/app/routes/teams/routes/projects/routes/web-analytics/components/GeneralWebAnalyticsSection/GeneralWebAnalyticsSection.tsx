import * as Tabs from '@radix-ui/react-tabs';
import { type FunctionComponent } from 'react';

import { Card } from '#app/components';
import { filters, useFilterActiveOption } from '#app/filters';

import { Section } from '../../../../components';
import {
  BounceRateTabTrigger,
  MedianSessionTimeTabContent,
  MedianSessionTimeTabTrigger,
  SessionsTabContent,
  SessionsTabTrigger,
  UniqueVisitorsTabTrigger,
  ViewsTabContent,
  ViewsTabTrigger,
  VisitorsChartTabContent,
  VisitorsRightNowTabTrigger,
} from './components';
import { BounceRateTabContent } from './components/BounceRateTabContent';

export const GeneralWebAnalyticsSection: FunctionComponent = () => {
  const {
    value: [range],
  } = useFilterActiveOption(filters.dateRange());

  return (
    <Section>
      <Card className="px-0 lg:px-0">
        <Tabs.Root defaultValue="visitors">
          <Tabs.List className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 py-4">
            {range === 'today' ? <VisitorsRightNowTabTrigger /> : <UniqueVisitorsTabTrigger />}
            <SessionsTabTrigger />
            <ViewsTabTrigger />
            <MedianSessionTimeTabTrigger />
            <BounceRateTabTrigger />
          </Tabs.List>
          <div className="h-75 w-full pt-2">
            <VisitorsChartTabContent />
            <SessionsTabContent />
            <ViewsTabContent />
            <MedianSessionTimeTabContent />
            <BounceRateTabContent />
          </div>
        </Tabs.Root>
      </Card>
    </Section>
  );
};
