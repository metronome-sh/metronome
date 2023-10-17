import { type FunctionComponent } from 'react';

import { Tabs } from '#app/components';
import { Section } from '#app/routes/teams/routes/projects/components/Section';

import { CitiesTabContent } from './components/CitiesTabContent';
import { CountriesTabContent } from './components/CountriesTabContent';

export const LocationsSection: FunctionComponent = () => {
  return (
    <Section>
      <Tabs defaultValue="countries" className="">
        <div className="flex justify-between items-end">
          <Section.Title title="Locations" />
          <div>
            <div className="flex justify-end pb-2">
              <Tabs.List className="p-0.5 h-auto bg-transparent">
                <Tabs.Trigger className="font-normal text-xs" value="countries">
                  Countries
                </Tabs.Trigger>
                <Tabs.Trigger className="font-normal text-xs" value="cities">
                  Cities
                </Tabs.Trigger>
              </Tabs.List>
            </div>
          </div>
        </div>
        <div>
          <CountriesTabContent />
          <CitiesTabContent />
        </div>
      </Tabs>
    </Section>
  );
};
