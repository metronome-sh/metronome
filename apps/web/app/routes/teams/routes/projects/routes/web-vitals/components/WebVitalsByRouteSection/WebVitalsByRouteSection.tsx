/* eslint-disable @typescript-eslint/no-explicit-any */
import { Await } from '@remix-run/react';
import { FunctionComponent, Suspense } from 'react';

import { Section } from '../../../../components';
import { useWebVitalsLoaderData } from '../../hooks/useWebVitalsLoaderData';
import { RoutesTable } from './RoutesTable';
import { RoutesTableLoadingState } from './RoutesTableLoadingState';

export const WebVitalsByRouteSection: FunctionComponent = () => {
  const { webVitalsBreakdownByRoute } = useWebVitalsLoaderData();

  return (
    <Section>
      <Section.Title title="Breakdown by route" />
      <Suspense fallback={<RoutesTableLoadingState />}>
        <Await resolve={webVitalsBreakdownByRoute}>
          <RoutesTable />
        </Await>
      </Suspense>
    </Section>
  );
};
