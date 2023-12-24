import { zodResolver } from '@hookform/resolvers/zod';
import { useFetcher, useParams } from '@remix-run/react';
import { type FunctionComponent, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Form, Input, Switch } from '#app/components';
import { cn } from '#app/components/utils';

import { useTeamProjectLoaderData } from '../../../../hooks';
import {
  ProjectVisibilitySchema,
  ProjectVisibilitySchemaType,
} from '../../$teamSlug.$projectSlug.settings.route';

export const VisibilityForm: FunctionComponent = () => {
  const { project } = useTeamProjectLoaderData();

  const { teamSlug, projectSlug } = useParams();

  const form = useForm<ProjectVisibilitySchemaType>({
    resolver: zodResolver(ProjectVisibilitySchema),
    defaultValues: {
      visible: !!project.isPublic,
    },
    mode: 'onSubmit',
  });

  // We use this when the data gets revalidated by remix
  // Probably we need to find a better way to do this in a Remixy way
  useEffect(() => {
    form.reset({ visible: !!project.isPublic });
  }, [project, form]);

  const fetcher = useFetcher();

  const onSubmit = useCallback(
    (data: ProjectVisibilitySchemaType) => {
      fetcher.submit(data, {
        method: 'POST',
        action: `/${teamSlug!}/${projectSlug}/settings?index&intent=visibility`,
      });
    },
    [fetcher, projectSlug, teamSlug],
  );

  const isDirty = Object.values(form.formState.dirtyFields).length > 0;

  return (
    <div>
      <Form.Section title="Visibility" description="Manage the project visibility." />
      <Form.Provider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Form.Field
            control={form.control}
            name="visible"
            render={({ field }) => (
              <Form.Item className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <Form.Label>Make project public</Form.Label>
                  <Form.Description>
                    Anyone that has your project link will be able to see your project data.
                  </Form.Description>
                </div>
                <Form.Control>
                  <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                </Form.Control>
              </Form.Item>
            )}
          />
          <Form.Field
            name="projectSharedLink"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Project link</Form.Label>
                <Form.Control>
                  <Input
                    readOnly
                    defaultValue={`https://metronome.sh/shared/${project.id}`}
                    className={cn(!form.getValues().visible && 'text-muted')}
                    onClick={(e) => e.currentTarget.select()}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <div className="text-right">
            <Button className="w-20" type="submit" disabled={!isDirty}>
              Update
              {/* <Loadable state={state}>Update</Loadable> */}
            </Button>
          </div>
        </form>
      </Form.Provider>
    </div>
  );
};
