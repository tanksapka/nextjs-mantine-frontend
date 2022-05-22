import { Table } from "@mantine/core";
import { IconArrowsSort, IconSortAscending, IconSortDescending } from "@tabler/icons";
import { Column, useTable, useSortBy } from "react-table";

function SimpleTable({ columns, data }: { columns: Array<Column>; data: Array<any> }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      // initialState: {
      //   hiddenColumns: columns
      //     .filter((column) => column.accessor?.toString().endsWith("id"))
      //     .map((col): string => (col.accessor ? col.accessor?.toString() : "")),
      // },
    },
    useSortBy
  );

  return (
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
        {rows.map((row) => {
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
  );
}

export { SimpleTable };
