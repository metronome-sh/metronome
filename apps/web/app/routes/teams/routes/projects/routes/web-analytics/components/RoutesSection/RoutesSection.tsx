import { type FunctionComponent } from 'react';

import { Tabs } from '#app/components';

import { Section } from '../../../../components';
import { RoutesSectionPathsTabContent } from './components/RoutesSectionPathsTabContent';
import { RoutesSectionUrlsTabContent } from './components/RoutesSectionUrlsTabContent';

export const RoutesSection: FunctionComponent = () => {
  return (
    <Section>
      <Tabs defaultValue="paths" className="">
        <div className="flex justify-between items-end">
          <Section.Title title="Routes" />
          <div>
            <div className="flex justify-end pb-2">
              <Tabs.List className="p-0.5 h-auto bg-transparent">
                <Tabs.Trigger className="font-normal text-xs" value="paths">
                  Paths
                </Tabs.Trigger>
                <Tabs.Trigger className="font-normal text-xs" value="urls">
                  URLs
                </Tabs.Trigger>
              </Tabs.List>
            </div>
          </div>
        </div>
        <div>
          <RoutesSectionPathsTabContent />
          <RoutesSectionUrlsTabContent />
        </div>
      </Tabs>
    </Section>
  );
};
