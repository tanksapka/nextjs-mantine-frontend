import { ActionIcon, Grid, Group, Pagination, Radio, RadioGroup, Select, Stack, Table } from "@mantine/core";
import { IconArrowsSort, IconSortAscending, IconSortDescending } from "@tabler/icons";
import { Column, useTable, useSortBy, usePagination, useFilters } from "react-table";

const pageSizeOptions = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

function SimpleTable({ columns, data }: { columns: Array<Column>; data: Array<any> }) {
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
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 20,
        hiddenColumns: columns
          .filter((column) => column.accessor?.toString().endsWith("id"))
          .map((col): string => (col.accessor ? col.accessor?.toString() : "")),
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumn } = column.getHeaderProps();
                  return (
                    <th key={key} {...restColumn} hidden={!column.isVisible}>
                      <Grid align="center" justify="center">
                        <Grid.Col span={8} style={{ marginRight: "1rem", justifyContent: "center" }}>
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
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps}>
          {page.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
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
          style={{ justifyContent: "center" }}
          total={pageCount}
          withEdges
        />
        <Select
          mt="lg"
          ml="sm"
          data={pageSizeOptions}
          defaultValue={pageSize.toString()}
          onChange={(value) => setPageSize(parseInt(value as string))}
          style={{ width: "6rem" }}
        />
      </Group>
    </>
  );
}

export { SimpleTable };
