import { SyntheticEvent, useEffect } from "react";
import { Column, Row, useFilters, usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import {
  Checkbox,
  createStyles,
  Divider,
  Group,
  LoadingOverlay,
  Pagination,
  Select,
  Table,
  Text,
  useCss,
} from "@mantine/core";
import filterTypes from "./filterTypes";
import { StringFilter } from "./filters";
import { IconArrowNarrowUp, IconArrowsSort } from "@tabler/icons";

const pageSizeOptions = ["10", "25", "50", "100"];

const useStyles = createStyles((t) => ({
  root: { height: "100%", display: "block" },
  tableContainer: {
    display: "block",
    overflow: "auto",
    "& > table": {
      "& > thead": { backgroundColor: t.colors.gray[0], zIndex: 1 },
      "& > thead > tr > th": { padding: t.spacing.md },
      "& > tbody > tr > td": { padding: t.spacing.md },
    },
  },
  stickHeader: { top: 0, position: "sticky" },
  sortableHeader: { "&:hover": { backgroundColor: t.colors.gray[2] } },
  disableSortIcon: { color: t.colors.gray[5] },
  sortDirectionIcon: { transition: "transform 200ms ease" },
}));

interface defaultColumnType {
  Filter: (prop: any) => JSX.Element;
  filter: string;
}

const selectionHook = (hook, selection) => {
  if (selection) {
    hook.visibleColumns.push((columns) => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <Checkbox {...getToggleAllRowsSelectedProps({ title: undefined })} />
        ),
        Cell: ({ row }: { row: Row }) => (
          <Checkbox
            {...row.getToggleRowSelectedProps({
              title: undefined,
              onClick: (e: SyntheticEvent) => e.stopPropagation(),
            })}
          />
        ),
      },
      ...columns,
    ]);
  }
};

interface MantineTableType {
  columns: Array<Column>;
  data: Array<any>;
  serverSideDataSource: boolean;
  initialPageSize: number;
  initialPageIndex: number;
  pageCount: number;
  total: number;
  // stickyHeader,
  customFilterTypes: object;
  debugging: boolean;
  reload: boolean;
  loading: boolean;
  filtering: boolean;
  sorting: boolean;
  selection: any;
  pagination: boolean;
  onRowClick: any;
  onAllRowsSelection: any;
  fetchData: any;
}

export const MantineTable = ({
  columns,
  data = [],
  serverSideDataSource = false,
  initialPageSize = 10,
  initialPageIndex = 0,
  pageCount = 0,
  total = 0,
  // stickyHeader,
  customFilterTypes = {},
  debugging = false,
  reload = false,
  loading = false,
  filtering = true,
  sorting = true,
  selection,
  pagination = true,
  onRowClick,
  onAllRowsSelection,
  fetchData, // Pass function to fetch data for server side operations
}: // ...rest
MantineTableType) => {
  const { classes, cx } = useStyles();
  const { css } = useCss();
  const defaultColumn: defaultColumnType = {
    Filter: StringFilter,
    filter: "stringFilter",
  };

  const tableOptions = useTable(
    {
      data,
      columns,
      defaultColumn,
      disableFilters: !filtering,
      disableSortBy: !sorting,

      manualFilters: serverSideDataSource,
      manualPagination: serverSideDataSource,
      manualSortBy: serverSideDataSource,

      autoResetFilters: !serverSideDataSource,
      autoResetPage: !serverSideDataSource,
      autoResetSortBy: !serverSideDataSource,
      autoResetSelectedRows: !serverSideDataSource,

      pageCount,
      filterTypes: { ...filterTypes, ...customFilterTypes },
      initialState: { pageSize: initialPageSize, pageIndex: initialPageIndex },
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hook) => selectionHook(hook, selection)
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy, filters },
  } = tableOptions;

  useEffect(() => {
    fetchData && fetchData({ pageIndex, pageSize, sortBy, filters });
  }, [sortBy, fetchData, pageIndex, pageSize, filters]);

  useEffect(() => {
    reload && fetchData && fetchData({ pageIndex, pageSize, sortBy, filters });
  }, [reload]);

  const handleRowClick = (e: SyntheticEvent, row: Row) => {
    console.log("Row Selected: ", row);
    onRowClick && onRowClick(row);
  };

  const getPageRecordInfo = () => {
    const firstRowNum = pageIndex * pageSize + 1;
    const totalRows = serverSideDataSource ? total : rows.length;

    const currLastRowNum = (pageIndex + 1) * pageSize;
    let lastRowNum = currLastRowNum < totalRows ? currLastRowNum : totalRows;
    return `${firstRowNum} - ${lastRowNum} of ${totalRows}`;
  };

  const getPageCount = () => {
    const totalRows = serverSideDataSource ? total : rows.length;
    return Math.ceil(totalRows / pageSize);
  };

  const handlePageChange = (pageNum: number) => gotoPage(pageNum - 1);

  const renderHeader = () =>
    headerGroups.map((hg) => {
      const { key, ...restHeaderGroupProps } = hg.getHeaderGroupProps();
      return (
        <tr key={key} {...restHeaderGroupProps}>
          {hg.headers.map((column) => {
            const { key, ...restColumn } = column.getHeaderProps(column.getSortByToggleProps({ title: undefined }));
            return (
              <th
                className={cx(
                  { [classes.sortableHeader]: column.canSort },
                  { [css({ minWidth: column.cellMinWidth })]: column.cellMinWidth },
                  { [css({ width: column.cellWidth })]: column.cellWidth }
                )}
                key={key}
                {...restColumn}
              >
                <Group noWrap position={column.align || "apart"}>
                  <div>{column.render("Header")}</div>
                  <Group noWrap position="left">
                    {column.canFilter ? column.render("Filter") : null}
                    {column.canSort ? (
                      column.isSorted ? (
                        <IconArrowNarrowUp
                          className={classes.sortDirectionIcon}
                          style={{
                            transform: column.isSortedDesc ? "rotate(180deg)" : "none",
                          }}
                        />
                      ) : (
                        <IconArrowsSort className={classes.disableSortIcon} />
                      )
                    ) : null}
                  </Group>
                </Group>
              </th>
            );
          })}
        </tr>
      );
    });

  const renderRow = (rows: Array<Row>) =>
    rows.map((row) => {
      prepareRow(row);
      const { key, ...restRowProps } = row.getRowProps({ onClick: (e) => handleRowClick(e, row) });
      return (
        <tr key={key} {...restRowProps}>
          {row.cells.map((cell) => {
            const { key, ...restCellProps } = cell.getCellProps();
            return (
              <td align={cell.column.align || "left"} key={key} {...restCellProps}>
                {cell.render("Cell")}
              </td>
            );
          })}
        </tr>
      );
    });

  return (
    <div className={classes.root}>
      <LoadingOverlay visible={loading} />
      <div className={classes.tableContainer} style={{ height: pagination ? "calc(100% - 44px)" : "100%" }}>
        {debugging && (
          <pre>
            <code>{JSON.stringify(filters, null, 2)}</code>
          </pre>
        )}

        <Table {...getTableProps()}>
          {/* <thead className={cx({ [classes.stickHeader]: stickyHeader })}> */}
          <thead>{renderHeader()}</thead>

          <tbody {...getTableBodyProps()}>{pagination ? renderRow(page) : renderRow(rows)}</tbody>
        </Table>
      </div>
      {pagination && (
        <>
          <Divider mb="md" variant="dotted" />
          <Group position="left">
            <Text size="sm">Rows per page: </Text>
            <Select
              style={{ width: "72px" }}
              variant="filled"
              data={pageSizeOptions}
              value={pageSize + ""}
              onChange={(pageSize) => setPageSize(Number(pageSize))}
            />
            <Divider orientation="vertical" />

            <Text size="sm">{getPageRecordInfo()}</Text>
            <Divider orientation="vertical" />

            <Pagination page={pageIndex + 1} total={getPageCount()} onChange={handlePageChange} />
          </Group>
        </>
      )}
    </div>
  );
};
