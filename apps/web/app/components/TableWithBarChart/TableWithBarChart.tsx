/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  type Cell,
  type ColumnDef,
  type FilterFn,
  type PaginationState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { type FunctionComponent } from 'react';
import { Fragment, useCallback, useMemo, useState } from 'react';

import { Button, cn, Icon, Input } from '#app/components';

const defaultCellClassName =
  'flex-grow text-left px-4 py-2 text-sm table-cell align-middle inline-block leading-none truncate';

const createDefaultCellRenderer = (className?: string) => {
  const cell: ColumnDef<any, number | string>['cell'] = ({ cell }) => {
    return (
      <div
        className={cn(defaultCellClassName, className)}
        style={{ width: cell.column.getSize() }}
      >
        {cell.getValue()}
      </div>
    );
  };

  return cell;
};

const createDefaultHeaderRenderer = ({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) => {
  const header: ColumnDef<any, number | string>['header'] = ({ header }) => {
    return (
      <div
        className={cn(
          'flex-grow text-left px-4 py-2 text-muted-foreground text-sm capitalize',
          className,
        )}
        style={{ width: header.column.getSize() }}
      >
        {label ?? header.id}
      </div>
    );
  };
  return header;
};

type Datum<T extends string> = {
  [key in T]: string | number | null;
};

export type ColumnOptions = {
  hidden?: true;
};

export type CellOptions<T> = {
  className?: string;
  size?: number;
  render?: (
    value: string | number,
    props: { className?: string; style: any },
    cell: Cell<T, string | number>,
  ) => JSX.Element;
};

export type HeaderOptions = {
  hidden?: boolean;
  className?: string;
  label?: string;
  // render?: (id: string) => JSX.Element;
};

export type TableWithBarChartProps<T extends string> = {
  data: Datum<T>[];
  valueKey: T;
  columns?: { [key in T]?: ColumnOptions };
  cells?: { [key in T]?: CellOptions<Datum<T>> };
  headers?: { [key in T]?: HeaderOptions };
  pageSize?: number;
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const Root = <T extends string>({
  data,
  columns,
  cells,
  headers,
  valueKey,
  pageSize = 5,
}: TableWithBarChartProps<T>) => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [globalFilter, setGlobalFilter] = useState('');

  const columnVisibility = useMemo(() => {
    if (!data.length) return {} as { [key in T]: boolean };

    const keys = Object.keys(data[0]) as T[];
    return keys.reduce(
      (acc, curr) => {
        return { ...acc, [curr]: !columns?.[curr]?.hidden };
      },
      {} as { [key in T]: boolean },
    );
  }, [columns, data]);

  const maxNumber = useMemo(() => {
    return data.reduce((acc, curr) => {
      return Math.max(acc, curr[valueKey] as number);
    }, 0);
  }, [data, valueKey]);

  const renderCell = useCallback(
    (key: T) => {
      if (!cells?.[key]?.render)
        return createDefaultCellRenderer(cells?.[key]?.className);

      const fn: ColumnDef<any, number | string>['cell'] = ({ cell }) => {
        return (
          cells?.[key]?.render?.(
            cell.getValue(),
            {
              className: cn(defaultCellClassName, cells?.[key]?.className),
              style: { width: cell.column.getSize() },
            },
            cell,
          ) ?? ''
        );
      };

      return fn;
    },
    [cells],
  );

  const renderHeader = useCallback(
    (key: T) => {
      if (headers?.[key]?.hidden) return '';

      return createDefaultHeaderRenderer({
        className: headers?.[key]?.className,
        label: headers?.[key]?.label,
      });
    },
    [headers],
  );

  const columnsDefs = useMemo(() => {
    if (!data.length) return [] as ColumnDef<Datum<T>, any>[];

    const keys = Object.keys(data[0]) as T[];

    const [cellsWithCustomSize, totalCustomColumnSize] = Object.values(
      cells ?? ({} as CellOptions<Datum<T>>),
    ).reduce(
      ([count, total], cell) => {
        if (cell?.size) return [count + 1, total + cell.size];
        return [count, total];
      },
      [0, 0],
    );

    const availableColumnSize = containerSize.width - totalCustomColumnSize;

    const visibleColumns = keys.filter((key) => !columns?.[key]?.hidden).length;

    return keys.map((key) => {
      const columnSize = cells?.[key]?.size
        ? cells?.[key]?.size
        : availableColumnSize / (visibleColumns - cellsWithCustomSize);

      return {
        accessorKey: key,
        header: renderHeader(key),
        cell: renderCell(key),
        size: columnSize,
      };
    });
  }, [cells, columns, containerSize.width, data, renderCell, renderHeader]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns: columnsDefs,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      globalFilter,
      columnVisibility,
      pagination,
    },
  });

  const refCallback = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainerSize({
        width: node.offsetWidth,
        height: node.offsetHeight,
      });
    }
  }, []);

  const tableHeight = useMemo(() => {
    const spaceY = 4;
    return pagination.pageSize * (32 + spaceY);
  }, [pagination.pageSize]);

  return (
    <div ref={refCallback}>
      <div className="rounded-lg border overflow-hidden min-h-[0px]">
        <div>
          <div className="py-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <div key={headerGroup.id} className="border-b-transparent flex">
                {headerGroup.headers.map((header) => {
                  return (
                    <Fragment key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Fragment>
                  );
                })}
              </div>
            ))}
          </div>
          <div
            className="space-y-1"
            style={{ height: data.length ? tableHeight : tableHeight + 36 }}
          >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const percentage =
                  ((row.original[valueKey] as number) / maxNumber) * 100;
                const width = `${percentage - 1}%`;

                return (
                  <div key={row.id} className="relative group">
                    <div
                      className={cn(
                        'relative flex z-10 group-hover:bg-muted/50 transition-colors duration-300 h-8',
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <Fragment key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Fragment>
                      ))}
                    </div>
                    <div
                      data-state={row.getIsSelected() && 'selected'}
                      className={cn(
                        'absolute inset-y-0 left-1 bg-muted group-hover:bg-muted-foreground pointer-events-none transition-colors duration-300',
                        // { 'rounded-bl-sm': row.index === data.length - 1 && data.length >= 5 }
                        {
                          // prettier-ignore
                          'rounded-bl-sm': Math.floor((row.index - table.getState().pagination.pageIndex * pagination.pageSize) / (pagination.pageSize - 1) ) === 1,
                        },
                      )}
                      style={{ width }}
                    />
                  </div>
                );
              })
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-muted">No results.</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-stretch justify-between py-2 gap-2">
        <div className="relative flex-grow">
          <Input
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.currentTarget.value)}
            className="bg-transparent placeholder:text-muted-foreground/70 pl-8"
          />
          <span className="absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
            <Icon.Search />
          </span>
        </div>
        <div className="flex items-stretch justify-end gap-2">
          <Button
            className="h-auto bg-transparent"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon.ArrowNarrowLeft />
          </Button>
          <Button
            className="h-auto bg-transparent"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icon.ArrowNarrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export type SkeletonProps = {
  pageSize?: number;
};

const Skeleton: FunctionComponent<SkeletonProps> = ({ pageSize = 5 }) => {
  return (
    <div>
      <div className="rounded-lg border overflow-hidden min-h-[0px] pb-1">
        <div className="h-10 px-4 w-full flex items-center">
          <div className="h-2 rounded-full w-full" />
        </div>
        <div>
          {Array.from({ length: pageSize ?? 5 }).map((_, index) => (
            <div key={index} className="py-1 px-4">
              <div className="h-7 flex">
                <div className="bg-muted h-2 rounded-full animate-pulse w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-stretch justify-between py-2 gap-2">
        <div className="relative flex-grow">
          <Input
            className="bg-transparent placeholder:text-muted-foreground/70 pl-8 pointer-events-none"
            disabled
            tabIndex={-1}
          />
          <span className="absolute inset-y-0 left-3 flex items-center text-sm text-muted">
            <Icon.Search />
          </span>
        </div>
        <div className="flex items-stretch justify-end gap-2">
          <Button
            className="h-auto bg-transparent text-muted-foreground"
            tabIndex={-1}
            variant="outline"
            size="sm"
            disabled
          >
            <Icon.ArrowNarrowLeft />
          </Button>
          <Button
            className="h-auto bg-transparent text-muted-foreground"
            tabIndex={-1}
            variant="outline"
            size="sm"
            disabled
          >
            <Icon.ArrowNarrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export type ErrorProps = {
  pageSize?: number;
};

const Error: FunctionComponent<ErrorProps> = ({ pageSize = 5 }) => {
  return (
    <div>
      <div className="rounded-lg border overflow-hidden min-h-[0px] pb-1">
        <div className="h-10 px-4 w-full flex items-center">
          <div className="h-2 rounded-full w-full" />
        </div>
        <div className="relative">
          {Array.from({ length: pageSize ?? 5 }).map((_, index) => (
            <div key={index} className="py-1 px-4">
              <div className="h-7 flex" />
            </div>
          ))}
          <div className="absolute inset-x-0 top-0 bottom-7 flex items-center justify-center gap-2">
            <div className="text-destructive">
              <Icon.MoodSadDizzy className="w-6 h-6" />
            </div>
            <div className="text-muted-foreground text-sm">Oops!</div>
          </div>
        </div>
      </div>
      <div className="flex items-stretch justify-between py-2 gap-2">
        <div className="relative flex-grow">
          <Input
            className="bg-transparent placeholder:text-muted-foreground/70 pl-8 pointer-events-none"
            tabIndex={-1}
            disabled
          />
          <span className="absolute inset-y-0 left-3 flex items-center text-sm text-muted">
            <Icon.Search />
          </span>
        </div>
        <div className="flex items-stretch justify-end gap-2">
          <Button
            className="h-auto bg-transparent text-muted-foreground"
            tabIndex={-1}
            variant="outline"
            size="sm"
            disabled
          >
            <Icon.ArrowNarrowLeft />
          </Button>
          <Button
            className="h-auto bg-transparent text-muted-foreground"
            tabIndex={-1}
            variant="outline"
            size="sm"
            disabled
          >
            <Icon.ArrowNarrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const TableWithBarChart = Object.assign(Root, { Skeleton, Error });
