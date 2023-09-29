import { Project } from '@metronome/db.server';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { PopoverProps } from '@radix-ui/react-popover';
import { FunctionComponent, useState } from 'react';

import { Avatar, Button, Command, Popover } from '#app/components';
import { cn } from '#app/components/utils';

import { useTeamLoaderData } from '../../hooks';
import { useTeamProjectLoaderData } from '../../routes/projects/hook';

export interface Preset {
  id: string;
  name: string;
}

export const ProjectSelector: FunctionComponent<PopoverProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Project>();

  const { projects } = useTeamLoaderData();

  const { project } = useTeamProjectLoaderData();

  console.log({ projects, project });

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Load a preset..."
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px] px-2"
        >
          <span className="pr-2">
            <Avatar className="w-5 h-5">
              {project.url ? (
                <Avatar.Image
                  src={`/resources/favicon?url=${project.url}`}
                  alt={project.name ?? 'Project avatar'}
                />
              ) : null}
              <Avatar.Fallback className="uppercase text-[10px] font-semibold group-hover:bg-muted-foreground/40">
                {project.name?.at(0)}
              </Avatar.Fallback>
            </Avatar>
          </span>
          <span>{project.name}</span>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[300px] p-0 ml-24">
        <Command>
          {/* <Command.Input placeholder="Search project..." /> */}
          <Command.Empty>No presets found.</Command.Empty>
          <Command.Group heading="Projects">
            {projects.map((p) => (
              <Command.Item
                key={p.id}
                value={p.id}
                className="group"
                onSelect={() => {
                  // setSelectedPreset(preset);
                  setOpen(false);
                }}
              >
                <span className="pr-2">
                  <Avatar className="w-5 h-5">
                    {p.url ? (
                      <Avatar.Image
                        src={`/resources/favicon?url=${p.url}`}
                        alt={p.name ?? 'Project avatar'}
                      />
                    ) : null}
                    <Avatar.Fallback className="uppercase text-[10px] font-semibold group-hover:bg-muted-foreground/40">
                      {p.name?.at(0)}
                    </Avatar.Fallback>
                  </Avatar>
                </span>
                <span>{p.name}</span>
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    project?.id === p.id ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </Command.Item>
            ))}
          </Command.Group>
        </Command>
      </Popover.Content>
    </Popover>
  );
};
