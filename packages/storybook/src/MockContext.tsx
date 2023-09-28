import { type Location } from '@remix-run/router';
import {
  createContext,
  type FunctionComponent,
  type PropsWithChildren,
} from 'react';

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
