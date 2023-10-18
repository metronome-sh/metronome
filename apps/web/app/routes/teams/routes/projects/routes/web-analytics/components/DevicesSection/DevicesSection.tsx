import { type FunctionComponent } from 'react';

import { Tabs } from '#app/components';

import { Section } from '../../../../components';
import { BrowsersTabContent } from './components/BrowsersTabContent';
import { OsTabContent } from './components/OsTabContent';

export const DevicesSection: FunctionComponent = () => {
  return (
    <Section>
      <Tabs defaultValue="browsers" className="">
        <div className="flex justify-between items-end">
          <Section.Title title="Devices" />
          <div>
            <div className="flex justify-end pb-2">
              <Tabs.List className="p-0.5 h-auto bg-transparent">
                <Tabs.Trigger className="font-normal text-xs" value="browsers">
                  Browsers
                </Tabs.Trigger>
                <Tabs.Trigger className="font-normal text-xs" value="os">
                  OS
                </Tabs.Trigger>
              </Tabs.List>
            </div>
          </div>
        </div>
        <div>
          <BrowsersTabContent />
          <OsTabContent />
        </div>
      </Tabs>
    </Section>
  );
};
