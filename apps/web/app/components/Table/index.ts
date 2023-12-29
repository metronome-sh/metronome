import {
  Table as TableComponent,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

export const Table: typeof TableComponent & {
  Body: typeof TableBody;
  Caption: typeof TableCaption;
  Cell: typeof TableCell;
  Head: typeof TableHead;
  Header: typeof TableHeader;
  Row: typeof TableRow;
} = Object.assign(TableComponent, {
  Body: TableBody,
  Caption: TableCaption,
  Cell: TableCell,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow,
});
