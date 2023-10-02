import { useLocation, useNavigation } from '@remix-run/react';
import { pathToRegexp } from 'path-to-regexp';
import { type FunctionComponent, type PropsWithChildren } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useRootLoaderData, useWindowVisibility } from '#app/hooks';

import { EventContext } from './EventContext';

export const EventProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { observableRoutes } = useRootLoaderData();

  const observableRouteRegexes = useMemo(() => {
    return (observableRoutes ?? []).map((route) => pathToRegexp(route));
  }, [observableRoutes]);

  const navigation = useNavigation();

  const location = useLocation();

  const isObservable = useMemo(() => {
    return observableRouteRegexes.some((r) => r.test(location.pathname));
  }, [observableRouteRegexes, location.pathname]);

  const isWindowVisible = useWindowVisibility(0);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const [reconnectAttempts, setReconnectAttempts] = useState(
    Number.MAX_SAFE_INTEGER,
  );

  const [eventTarget, setEventTarget] = useState<EventTarget>(
    new EventTarget(),
  );

  useEffect(() => {
    if (navigation.state === 'idle') {
      setEventTarget(new EventTarget());
    }
  }, [navigation.state]);

  useEffect(() => {
    if (!isObservable || !isWindowVisible) return;

    const url = `${location.pathname}/events${location.search}`;

    const eventSource = new EventSource(url);

    eventSource.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      eventTarget.dispatchEvent(
        new CustomEvent(data.name, { detail: data.detail }),
      );
    });

    eventSource.addEventListener('error', () => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setReconnectAttempts((value) => value - 1);
      }, 5000);
    });

    return () => {
      clearTimeout(timeoutRef.current);
      eventSource.close();
    };
  }, [reconnectAttempts, eventTarget, isObservable, location, isWindowVisible]);

  const autoRefreshTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isObservable || !isWindowVisible) return;

    autoRefreshTimeoutRef.current = setInterval(() => {
      setReconnectAttempts((attempts) => attempts - 1);
    }, 50 * 1000);

    return () => {
      clearTimeout(autoRefreshTimeoutRef.current);
    };
  }, [isObservable, isWindowVisible]);

  return (
    <EventContext.Provider value={{ eventTarget }}>
      {children}
    </EventContext.Provider>
  );
};
