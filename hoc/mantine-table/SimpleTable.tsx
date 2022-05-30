import { ActionIcon, createStyles, Grid, Group, Pagination, Select, Stack, Table } from "@mantine/core";
import { IconArrowsSort, IconSortAscending, IconSortDescending } from "@tabler/icons";
import { useTable, useSortBy, usePagination, useFilters, TableOptions } from "react-table";
import { CSSProperties } from "react";

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
  rowOnClick?: () => void;
  rowIcons?: Array<JSX.Element>;
}

const defaultPageSizeOptions: PageSizeOptions = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

const useStyles = createStyles((t) => ({
  hoverCls: {
    "&:hover": {
      backgroundColor: t.colors.gray[1],
    },
  },
}));

function SimpleTable({
  tableOptions,
  displayOptions,
  interactionOptions,
}: {
  tableOptions: TableOptions<object>;
  displayOptions?: DisplayOptions;
  interactionOptions?: InteractionOptions;
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
    prepareRow,
  } = useTable(tableOptions, useFilters, useSortBy, usePagination);
  const { classes, cx } = useStyles();

  return (
    <>
      <Table {...getTableProps()} style={{ ...displayOptions?.styleOverrides?.table }}>
        <thead style={{ ...displayOptions?.styleOverrides?.header?.thead }}>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps} style={{ ...displayOptions?.styleOverrides?.header?.tr }}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumn } = column.getHeaderProps();
                  return (
                    <th
                      key={key}
                      {...restColumn}
                      hidden={!column.isVisible}
                      className={displayOptions?.hover?.header ? classes.hoverCls : undefined}
                      style={{ ...displayOptions?.styleOverrides?.header?.th }}
                    >
                      <Grid align="center" justify="center">
                        <Grid.Col span={8} style={{ justifyContent: "center", textAlign: "center" }}>
                          {column.render("Header")}
                        </Grid.Col>
                        <Grid.Col span={2} {...column.getSortByToggleProps()}>
                          <Stack justify="center">
                            {column.canFilter && column.render("Filter")}
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ActionIcon size={16} color="blue" variant="hover">
                                  <IconSortDescending />
                                </ActionIcon>
                              ) : (
                                <ActionIcon size={16} color="blue" variant="hover">
                                  <IconSortAscending />
                                </ActionIcon>
                              )
                            ) : (
                              <ActionIcon size={16}>
                                <IconArrowsSort />
                              </ActionIcon>
                            )}
                          </Stack>
                        </Grid.Col>
                      </Grid>
                    </th>
                  );
                })}
                {interactionOptions?.rowIcons && (
                  <th
                    className={displayOptions?.hover?.header ? classes.hoverCls : undefined}
                    style={{ ...displayOptions?.styleOverrides?.header?.th }}
                  >
                    Actions
                  </th>
                )}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps} style={{ ...displayOptions?.styleOverrides?.body?.tbody }}>
          {page.map((row, rowIdx) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr
                key={key}
                {...restRowProps}
                className={displayOptions?.hover?.row ? classes.hoverCls : undefined}
                style={{ ...displayOptions?.styleOverrides?.body?.tr }}
              >
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps} style={{ ...displayOptions?.styleOverrides?.body?.td }}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                {interactionOptions?.rowIcons && <td>{interactionOptions.rowIcons[pageIndex * pageSize + rowIdx]}</td>}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Group align="center" style={{ justifyContent: "center" }}>
        <Pagination
          onChange={(n: number) => gotoPage(n - 1)}
          mt="lg"
          page={pageIndex + 1}
          style={{ justifyContent: "center", ...displayOptions?.styleOverrides?.pagination }}
          total={pageCount}
          withEdges
        />
        <Select
          mt="lg"
          ml="sm"
          data={displayOptions?.pageSizeOptions || defaultPageSizeOptions}
          defaultValue={pageSize.toString()}
          onChange={(value) => setPageSize(parseInt(value as string))}
          style={{ width: "6rem", ...displayOptions?.styleOverrides?.pageSize }}
        />
      </Group>
    </>
  );
}

export { SimpleTable };
