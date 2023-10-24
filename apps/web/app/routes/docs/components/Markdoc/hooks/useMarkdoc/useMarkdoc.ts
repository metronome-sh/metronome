import { type RenderableTreeNodes } from '@markdoc/markdoc';
import { renderers } from '@markdoc/markdoc';
// eslint-disable-next-line import/default
import React, { useMemo } from 'react';

import {
  Button,
  Code,
  Fence,
  Heading,
  Image,
  InstallationTarget,
  InstallationTargets,
  Link,
  List,
  ListItem,
  Paragraph,
  Strong,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from '../../components';
import { Alert } from '../../components/Alert/Alert';

export function useMarkdoc(renderableTreeNodes: RenderableTreeNodes) {
  const rendered = useMemo(
    () =>
      renderers.react(renderableTreeNodes, React, {
        components: {
          Alert,
          Heading,
          Paragraph,
          Button,
          Image,
          InstallationTargets,
          InstallationTarget,
          Fence,
          Code,
          Link,
          Table,
          THead,
          TBody,
          Tr,
          Th,
          Td,
          Strong,
          List,
          ListItem,
        },
      }),
    [renderableTreeNodes],
  );

  return rendered;
}
