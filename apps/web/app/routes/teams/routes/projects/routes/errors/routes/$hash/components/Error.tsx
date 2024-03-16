import { FunctionComponent } from 'react';
import { useErrorHashLoaderData } from '../hooks/useErrorHashLoaderData';
import { cn } from '#app/components/utils';
import { Icon } from '#app/components/Icon';
import { useRelativeErrorDates } from '../../../hooks/useRelativeErrorDates';
import { Select } from '#app/components/Select';

export const Error: FunctionComponent = () => {
  const { error } = useErrorHashLoaderData();
  const { lastSeenFormatted, relativeLastSeen } = useRelativeErrorDates(error);

  return (
    <div className="md:px-4 flex justify-between flex-wrap-reverse gap-4">
      <div className="flex flex-wrap gap-2 text-sm">
        <div
          className={cn('flex items-center border rounded-md px-2 py-0.5 gap-1', {
            'border-blue-700': error.kind !== 2,
            'border-green-700': error.kind === 2,
          })}
        >
          {error.kind === 2 ? <Icon.Monitor /> : <Icon.Server />}
          <span className="font-medium">{error.kind === 2 ? 'Client' : 'Server'}</span>
        </div>
        <div className="space-y-2">
          <span className="block border w-fit rounded-md px-2 divide-x">
            <span className="inline-block py-1 pr-2 text-white">Error ID</span>
            <span className="inline-block py-1 text-muted-foreground pl-2">{error.hash}</span>
          </span>
        </div>
        <Highlight title="Date" value={`${lastSeenFormatted} (${relativeLastSeen})`} />
      </div>
      <div className="flex justify-end w-full md:pl-8">
        <Select>
          <Select.Trigger className="w-full">
            <Select.Value placeholder="Select a fruit" />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Label>Fruits</Select.Label>
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
              <Select.Item value="blueberry">Blueberry</Select.Item>
              <Select.Item value="grapes">Grapes</Select.Item>
              <Select.Item value="pineapple">Pineapple</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select>
      </div>
    </div>
  );
};

const Highlight: FunctionComponent<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <div className="space-y-2">
      <span className="block border w-fit rounded-md px-2 divide-x">
        <span className="inline-block py-1 pr-2 text-white">{title}</span>
        <span className="inline-block py-1 text-muted-foreground pl-2">{value}</span>
      </span>
    </div>
  );
};
