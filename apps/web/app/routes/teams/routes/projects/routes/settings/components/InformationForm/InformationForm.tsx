import { type FunctionComponent, useEffect, useState } from 'react';

import { Button, Form, Icon, Input, Label, Tooltip } from '#app/components';
import { useTinyKeys } from '#app/hooks/useTinyKeys';

import { useTeamProjectLoaderData } from '../../../../hooks';
// import { Loadable } from '#app/components/Loadable';
// import { Button } from '#app/components/ui/button';
// import { FormSection } from '#app/components/ui/form';
// import { Input } from '#app/components/ui/input';
// import { Label } from '#app/components/ui/label';
// import { useProject } from '#app/routes/teams/routes/projects/hooks';
import { RotateApiKey } from './components/RotateApiKey';
import { Usage } from './components/Usage';

export const InformationForm: FunctionComponent = () => {
  const { project } = useTeamProjectLoaderData();

  const [showApiKey, setShowApiKey] = useState(false);

  const [apiKeySelected, setApiKeySelected] = useState(false);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2000);
    }
  }, [copied]);

  useTinyKeys({
    '$mod+KeyC': () => {
      if (apiKeySelected) {
        navigator.clipboard?.writeText(project.apiKey);
      }
    },
  });

  return (
    <div className="space-y-6">
      <Form.Section
        title="Information"
        description="Project API key and usage"
      />
      <div className="flex items-center gap-2">
        <div className="flex flex-col w-full space-y-2">
          <Label>Metronome SDK API Key</Label>
          <div className="flex items-center space-x-2">
            <Input
              value={project.apiKey}
              onClick={(e) => {
                e.currentTarget.select();
                setApiKeySelected(true);
              }}
              onBlur={() => setApiKeySelected(false)}
              type={showApiKey ? 'text' : 'password'}
              readOnly
              className="w-full"
            />
            <div className="flex-shrink-0">
              <Tooltip.Provider>
                <Tooltip>
                  <Tooltip.Trigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-shrink-0"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <Icon.EyeClosed /> : <Icon.Eye />}
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <p>{showApiKey ? 'Hide' : 'Reveal'} API Key</p>
                  </Tooltip.Content>
                </Tooltip>
              </Tooltip.Provider>
            </div>
            <Tooltip.Provider>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={() => {
                      navigator.clipboard?.writeText(project.apiKey);
                      setCopied(true);
                    }}
                  >
                    {/* <Loadable state={copied ? 'success' : null}> */}
                    <Icon.ClipboardCopy className="w-5 h-5" />
                    {/* </Loadable> */}
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>Copy API Key</p>
                </Tooltip.Content>
              </Tooltip>
            </Tooltip.Provider>
            <RotateApiKey key={project.apiKey} />
          </div>

          <p className="text-[0.8rem] text-muted-foreground">
            Use this key as{' '}
            <span className="inline mx-0.5 font-mono bg-muted rounded px-1 py-0.5">
              METRONOME_API_KEY
            </span>{' '}
            environment variable in your Remix App.
          </p>
        </div>
      </div>
      <Usage />
    </div>
  );
};
