import type { MetaFunction } from '@remix-run/server-runtime';
import type { ComponentType } from 'react';

export interface MDXModule {
  attributes: {
    title?: string;
    description?: string;
    map?: string[];
    navigatable?: boolean;
  };
  filename: string;
  default: ComponentType;
}

export interface MDXDocumentProperties {
  filename: string;
  title: string;
  slug: string;
  isSubItem: boolean;
  navigatable: boolean;
}

export interface DocumentRoute {
  component: ComponentType;
  meta: MetaFunction;
}

export interface DocumentMeta {
  title?: string;
  description?: string;
  label?: string;
  [key: string]: string | undefined;
}

export type DocumentSidebarItem = {
  label: string;
  path: string | null;
  children: DocumentSidebarItem[];
};

export type DocumentSidebarItems = DocumentSidebarItem[];

export interface DocumentSectionItem {
  label: string;
  filename?: string;
  path: string;
}

export interface DocumentSection extends DocumentSectionItem {
  items?: Required<DocumentSectionItem>[];
}

export type DocumentSections = DocumentSection[];

export interface DocumentHeading {
  title: string;
  level: number;
}

export type DocumentHeadings = DocumentHeading[];
