import { ActionIcon, Checkbox, createStyles, Grid, Group, Pagination, Select, Stack, Table } from "@mantine/core";
import { IconArrowsSort, IconSortAscending, IconSortDescending } from "@tabler/icons";
import {
  useReactTable,
  // useSortBy,
  // usePagination,
  // useFilters,
  TableOptions,
  Row,
  // Hooks,
  // useRowSelect,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { CSSProperties } from "react";
import { OrganizationsRowItem } from "../../types/organizations";

type PageSizeOptions = Array<{ value: string; label: string }>;

interface DisplayOptions {
  pageSizeOptions?: PageSizeOptions;
  hover?: {
    header?: boolean;
    row?: boolean;
    footer?: boolean /* TODO: add footer */;
  };
  stripedRows?: boolean;
  styleOverrides?: {
    table?: CSSProperties;
    header?: { thead?: CSSProperties; tr?: CSSProperties; th?: CSSProperties; td?: CSSProperties };
    body?: { tbody?: CSSProperties; tr?: CSSProperties; th?: CSSProperties; td?: CSSProperties };
    footer?: {
      tfoot?: CSSProperties;
      tr?: CSSProperties;
      th?: CSSProperties;
      td?: CSSProperties;
    } /* TODO: add footer */;
    pagination?: CSSProperties;
    pageSize?: CSSProperties;
  };
}

interface InteractionOptions {
  rowSelectable?: boolean;
  rowOnClick?: (row: Row<object>) => void;
  rowIcons?: (row: Row<object>) => JSX.Element;
}

const defaultPageSizeOptions: PageSizeOptions = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

const useStyles = createStyles((t, { hoverRow, striped }: { hoverRow?: boolean; striped?: boolean }) => ({
  hoverCls: {
    "&:hover": {
      backgroundColor: t.colors.gray[4],
    },
  },
  mergedCls: {
    "tr:nth-of-type(2n)": striped && {
      backgroundColor: t.colors.gray[1],
      "&:hover": hoverRow && {
        backgroundColor: t.colors.gray[4],
      },
    },
    "tr:hover": hoverRow && {
      backgroundColor: t.colors.gray[4],
    },
  },
}));

// const selectionHook = (hook: Hooks<object>, selection: boolean) => {
//   if (selection) {
//     hook.visibleColumns.push((columns) => [
//       {
//         id: "selection",
//         Header: ({ getToggleAllRowsSelectedProps }) => (
//           // <Grid>
//           //   <Grid.Col>
//           <Checkbox {...getToggleAllRowsSelectedProps()} />
//           //   </Grid.Col>
//           // </Grid>
//         ),
//         Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
//       },
//       ...columns,
//     ]);
//   }
// };

function SimpleTable({
  tableOptions,
  displayOptions,
  interactionOptions,
}: {
  tableOptions: TableOptions<OrganizationsRowItem>;
  displayOptions?: DisplayOptions;
  interactionOptions?: InteractionOptions;
}) {
  // const {
  // getTableProps,
  // getTableBodyProps,
  // getHeaderGroups,
  // page,
  // pageCount,
  // gotoPage,
  // setPageSize,
  // state: { pageIndex, pageSize, selectedRowIds },
  // prepareRow,
  // } = useReactTable({ ...tableOptions, getCoreRowModel: getCoreRowModel() });
  const table = useReactTable(tableOptions);
  // const table = useReactTable({...tableOptions, getCoreRowModel: getCoreRowModel()});
  const { classes, cx } = useStyles({ hoverRow: displayOptions?.hover?.row, striped: displayOptions?.stripedRows });
  // console.log(selectedRowIds);
  // const stat = table.initialState.rowSelection

  return (
    <>
      <Table style={{ ...displayOptions?.styleOverrides?.table }}>
        <thead style={{ ...displayOptions?.styleOverrides?.header?.thead }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} style={{ ...displayOptions?.styleOverrides?.header?.tr }}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  hidden={!column.getContext().column.getIsVisible()}
                  className={displayOptions?.hover?.header ? classes.hoverCls : undefined}
                  style={{ ...displayOptions?.styleOverrides?.header?.th }}
                >
                  <Grid align="center" justify={column.id !== "selection" ? "center" : undefined}>
                    <Grid.Col span={8} style={{ justifyContent: "center", textAlign: "center" }}>
                      {flexRender(column.column.columnDef.header, column.getContext())}
                    </Grid.Col>
                    <Grid.Col span={2}>
                      {/* <Stack justify="center" sx={{ gap: "0.25rem" }}>
                        {column.getContext().column.getCanFilter() && column.render("Filter")}
                        {column.getContext().column.getIsSorted() ? (
                          column.getContext().column.getIsSorted() === "desc" ? (
                            <ActionIcon size={16} color="blue" variant="subtle" {...column.getSortByToggleProps()}>
                              <IconSortDescending />
                            </ActionIcon>
                          ) : (
                            <ActionIcon size={16} color="blue" variant="subtle" {...column.getSortByToggleProps()}>
                              <IconSortAscending />
                            </ActionIcon>
                          )
                        ) : (
                          column.id !== "selection" && (
                            <ActionIcon size={16} {...column.getSortByToggleProps()}>
                              <IconArrowsSort />
                            </ActionIcon>
                          )
                        )}
                      </Stack> */}
                    </Grid.Col>
                  </Grid>
                </th>
              ))}
              {interactionOptions?.rowIcons && (
                <th
                  className={displayOptions?.hover?.header ? classes.hoverCls : undefined}
                  style={{ ...displayOptions?.styleOverrides?.header?.th }}
                >
                  Interakciók
                </th>
              )}
            </tr>
          ))}
        </thead>
        <tbody className={classes.mergedCls} style={{ ...displayOptions?.styleOverrides?.body?.tbody }}>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() =>
                interactionOptions?.rowOnClick &&
                !interactionOptions.rowSelectable &&
                interactionOptions.rowOnClick(row as Row<object>)
              }
              style={{
                cursor: interactionOptions?.rowOnClick && !interactionOptions.rowSelectable ? "pointer" : "default",
                ...displayOptions?.styleOverrides?.body?.tr,
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ ...displayOptions?.styleOverrides?.body?.td }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              {interactionOptions?.rowIcons && <td>{interactionOptions.rowIcons(row as Row<object>)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
      <Group align="center" style={{ justifyContent: "center" }}>
        <Pagination
          onChange={(n: number) => table.setPageIndex(n - 1)}
          mt="lg"
          page={table.getState().pagination.pageIndex + 1}
          style={{ justifyContent: "center", ...displayOptions?.styleOverrides?.pagination }}
          total={table.getPageCount()}
          withEdges
        />
        <Select
          mt="lg"
          ml="sm"
          data={displayOptions?.pageSizeOptions || defaultPageSizeOptions}
          defaultValue={table.getState().pagination.pageSize.toString()}
          onChange={(value) => table.setPageSize(parseInt(value as string))}
          style={{ width: "6rem", ...displayOptions?.styleOverrides?.pageSize }}
        />
      </Group>
    </>
  );
}

export { SimpleTable };
