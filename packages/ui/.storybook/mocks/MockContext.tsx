import React, {
  FunctionComponent,
  PropsWithChildren,
  createContext,
} from 'react';
import type { Navigation, Location } from '@remix-run/router';

type NavigationOverride = Partial<{
  state: 'loading' | 'idle' | 'submitting';
  location: Location;
}>;

export type MockContextValue = {
  navigation?: NavigationOverride | [NavigationOverride, NavigationOverride];
  fetcher?: Partial<{
    state: 'loading' | 'idle' | 'submitting';
    data: Record<string, unknown>;
    formAction: string | undefined;
    formData: FormData | undefined;
  }>;
};

export const MockContext = createContext<MockContextValue>({});

export const MockProvider: FunctionComponent<
  PropsWithChildren<{ mocks: MockContextValue }>
> = ({ children, mocks }) => {
  return (
    <MockContext.Provider value={{ ...mocks }}>{children}</MockContext.Provider>
  );
};
