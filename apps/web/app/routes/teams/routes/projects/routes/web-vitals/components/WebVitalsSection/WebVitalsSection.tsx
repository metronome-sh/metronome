import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { formatDuration } from '#app/utils';

import { Section } from '../../../../components/Section';
import { useIsNavigatingWebVitals } from '../../hooks/useIsNavigatingWebVitals';
import { useWebVitalsEventData } from '../../hooks/useWebVitalsEventData';
import { useWebVitalsLoaderData } from '../../hooks/useWebVitalsLoaderData';
import { WebVitalsCard } from './components/WebVitalsCard';

const VITALS = [
  { name: 'LCP', median: '2.5 s', p10: '4.0 s' },
  { name: 'FID', median: '100 ms', p10: '300 ms' },
  { name: 'CLS', median: '0.1', p10: '0.25' },
  { name: 'INP', median: '200 ms', p10: '500 ms' },
  { name: 'TTFB', median: '800 ms', p10: '1800 ms' },
  { name: 'FCP', median: '1.8 s', p10: '3.0 s' },
];

const WebVitals: FunctionComponent = () => {
  const { webVitalsOverview } = useWebVitalsLoaderData();
  const { webVitalsOverview: webVitalsOverviewEvent } = useWebVitalsEventData();

  const isNavigating = useIsNavigatingWebVitals();

  if (isNavigating) {
    return (
      <>
        {VITALS.map((vital) => (
          <WebVitalsCard.Skeleton
            key={vital.name}
            name={vital.name}
            median={vital.median}
            p10={vital.p10}
          />
        ))}
      </>
    );
  }

  return (
    <Suspense
      fallback={
        <>
          {VITALS.map((vital) => (
            <WebVitalsCard.Skeleton
              key={vital.name}
              name={vital.name}
              median={vital.median}
              p10={vital.p10}
            />
          ))}
        </>
      }
    >
      <Await
        resolve={webVitalsOverview}
        errorElement={
          <>
            {VITALS.map((vital) => (
              <WebVitalsCard.Error key={vital.name} />
            ))}
          </>
        }
      >
        {(resolvedWebVitalsOverview) => {
          const overview = Object.fromEntries(
            (webVitalsOverviewEvent ?? resolvedWebVitalsOverview).map((vital) => [
              vital.name,
              {
                ...vital,
                parsed: {
                  ...vital.values,
                  p75:
                    vital.name === 'CLS'
                      ? vital.values.p75 !== null
                        ? `${Math.round(vital.values.p75 * 100) / 100}`
                        : '—'
                      : formatDuration(vital.values.p75, 'ms'),
                },
              },
            ]),
          );

          return (
            <>
              {VITALS.map((vital) => {
                return (
                  <WebVitalsCard
                    key={`${vital.name}-${overview[vital.name].values.p75}`}
                    name={vital.name}
                    median={vital.median}
                    p10={vital.p10}
                    score={overview[vital.name].scores.p75}
                    value={overview[vital.name].parsed.p75}
                  />
                );
              })}
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export const WebVitalsSection: FunctionComponent = () => {
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
        <WebVitals />
      </div>
    </Section>
  );
};
