import { ActionIcon, Container } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { createColumnHelper, Column, Row } from "@tanstack/react-table";
import { DateFilter, StringFilter } from "../../hoc/mantine-table/filters";
import filterObject from "../../hoc/mantine-table/filterTypes";
import { SimpleTable } from "../../hoc/mantine-table/SimpleTable";
import { OrganizationsRawType, OrganizationsRowItem } from "../../types/organizations";

function Organizations({ organizations, page_count, page_size, page }: OrganizationsRawType) {
  const columnHelper = createColumnHelper<OrganizationsRowItem>();
  const columns = [
    columnHelper.accessor("organization_id", {
      header: "Alapszervezet azonosítója",
    }),
    columnHelper.accessor("organization_name", {
      header: "Alapszervezet neve",
    }),
    columnHelper.accessor("parent_organization_id", {
      header: "Szülőszervezet azonosítója",
    }),
    columnHelper.accessor("parent_organization_name", {
      header: "Szülőszervezet neve",
    }),
    columnHelper.accessor("description", {
      header: "Leírás",
    }),
    columnHelper.accessor("accepts_members_flag", {
      header: "Fogad tagokat?",
    }),
    columnHelper.accessor("establishment_date", {
      header: "Alapítás dátuma",
    }),
    columnHelper.accessor("termination_date", {
      header: "Megszűnés dátuma",
    }),
    columnHelper.accessor("notes", {
      header: "Jegyzetek",
    }),
  ];
  // const columns = useMemo(
  //   (): Array<Column> => [
  //     {
  //       Header: "Alapszervezet azonosítója",
  //       accessor: "organization_id",
  //     },
  //     {
  //       Header: "Alapszervezet neve",
  //       accessor: "organization_name",
  //       Filter: StringFilter,
  //       filter: filterObject.stringFilter,
  //     },
  //     {
  //       Header: "Szülőszervezet azonosítója",
  //       accessor: "parent_organization_id",
  //     },
  //     {
  //       Header: "Szülőszervezet neve",
  //       accessor: "parent_organization_name",
  //       Filter: StringFilter,
  //       filter: filterObject.stringFilter,
  //     },
  //     {
  //       Header: "Leírás",
  //       accessor: "description",
  //     },
  //     {
  //       Header: "Fogad tagokat?",
  //       accessor: "accepts_members_flag",
  //       Filter: StringFilter,
  //       filter: filterObject.stringFilter,
  //     },
  //     {
  //       Header: "Alapítás dátuma",
  //       accessor: "establishment_date",
  //       Filter: DateFilter,
  //       filter: filterObject.dateFilter,
  //     },
  //     {
  //       Header: "Megszűnés dátuma",
  //       accessor: "termination_date",
  //       Filter: DateFilter,
  //       filter: filterObject.dateFilter,
  //     },
  //     {
  //       Header: "Jegyzetek",
  //       accessor: "notes",
  //     },
  //   ],
  //   []
  // );
  const data = useMemo(() => organizations, []);
  const router = useRouter();

  return (
    <Container size="xl">
      <SimpleTable
        tableOptions={{
          columns: columns,
          data: data,
          initialState: {
            pageIndex: page,
            pageSize: page_size,
            hiddenColumns: ["organization_id", "parent_organization_id", "description", "notes"],
          },
          manualPagination: true,
          pageCount: page_count,
        }}
        displayOptions={{
          hover: { header: true, row: true },
        }}
        interactionOptions={{
          rowIcons: (row) => {
            const rowOriginal = row.original as OrganizationsRowItem;
            return (
              <ActionIcon component={Link} href={`/organizations/${rowOriginal.organization_id}`} passHref>
                <a title="Szerkesztés...">
                  <IconPencil style={{ color: "#1c7ed6" }} />
                </a>
              </ActionIcon>
            );
          },
          rowOnClick: (row: Row<object>) => {
            const rowOriginal = row.original as OrganizationsRowItem;
            router.push(`/organizations/${rowOriginal.organization_id}`);
          },
          rowSelectable: true,
        }}
      />
    </Container>
  );
}

export { Organizations };
