import { Center, Group, Pagination, Select, Table } from "@mantine/core";
import { IconArrowsSort, IconSortAscending, IconSortDescending } from "@tabler/icons";
import { Column, useTable, useSortBy, usePagination } from "react-table";

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
        //   hiddenColumns: columns
        //     .filter((column) => column.accessor?.toString().endsWith("id"))
        //     .map((col): string => (col.accessor ? col.accessor?.toString() : "")),
      },
    },
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
                  const { key, ...restColumn } = column.getHeaderProps(column.getSortByToggleProps());
                  return (
                    <th key={key} {...restColumn} hidden={!column.isVisible}>
                      {column.render("Header")}
                      <span style={{ marginLeft: "1rem" }}>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <IconSortDescending size={16} />
                          ) : (
                            <IconSortAscending size={16} />
                          )
                        ) : (
                          <IconArrowsSort size={16} />
                        )}
                      </span>
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* <Center> */}
        <Pagination
          onChange={(n: number) => gotoPage(n - 1)}
          mt="lg"
          page={pageIndex + 1}
          style={{ justifyContent: "center" }}
          total={pageCount}
          withEdges
        />
        {/* </Center> */}
        <Select
          mt="lg"
          ml="sm"
          data={pageSizeOptions}
          defaultValue={pageSize.toString()}
          onChange={(value) => setPageSize(parseInt(value as string))}
        />
      </div>
    </>
  );
}

export { SimpleTable };
