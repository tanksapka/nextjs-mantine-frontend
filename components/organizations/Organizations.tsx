import { ActionIcon, Container } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import Link from "next/link";
import { useMemo } from "react";
import { Column } from "react-table";
import { DateFilter, StringFilter } from "../../hoc/mantine-table/filters";
import filterObject from "../../hoc/mantine-table/filterTypes";
import { SimpleTable } from "../../hoc/mantine-table/SimpleTable";
import { OrganizationsRawType } from "../../types/organizations";

function Organizations({ organizations }: OrganizationsRawType) {
  const columns = useMemo(
    (): Array<Column> => [
      {
        Header: "Alapszervezet azonosítója",
        accessor: "id",
      },
      {
        Header: "Alapszervezet neve",
        accessor: "organization_name",
        Filter: StringFilter,
        filter: filterObject.stringFilter,
      },
      {
        Header: "Szülőszervezet azonosítója",
        accessor: "parent_organization_id",
      },
      {
        Header: "Szülőszervezet neve",
        accessor: "parent_organization_name",
        Filter: StringFilter,
        filter: filterObject.stringFilter,
      },
      // {
      //   Header: "Leírás",
      //   accessor: "description",
      // },
      {
        Header: "Fogad tagokat?",
        accessor: "accepts_members_flag",
        Filter: StringFilter,
        filter: filterObject.stringFilter,
      },
      {
        Header: "Alapítás dátuma",
        accessor: "establishment_date",
        Filter: DateFilter,
        filter: filterObject.dateFilter,
      },
      {
        Header: "Megszűnés dátuma",
        accessor: "termination_date",
        Filter: DateFilter,
        filter: filterObject.dateFilter,
      },
      // {
      //   Header: "Jegyzet",
      //   accessor: "notes",
      // },
    ],
    []
  );
  const data = useMemo(() => organizations, []);

  return (
    <Container size="xl">
      <SimpleTable
        tableOptions={{
          columns: columns,
          data: data,
          initialState: {
            pageSize: 20,
            hiddenColumns: columns
              .filter((column) => column.accessor?.toString().endsWith("id"))
              .map((col): string => (col.accessor ? col.accessor?.toString() : "")),
          },
        }}
        displayOptions={{
          hover: { header: true, row: true },
        }}
        interactionOptions={{
          rowIcons: data.map((row) => (
            <ActionIcon key={row.id} component={Link} href={`/organizations/${row.id}`} passHref>
              <a title="Edit...">
                <IconPencil style={{ color: "#1c7ed6" }} />
              </a>
            </ActionIcon>
          )),
        }}
      />
    </Container>
  );
}

export { Organizations };
