import { ActionIcon, Container } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Column, Row } from "react-table";
import { DateFilter, StringFilter } from "../../hoc/mantine-table/filters";
import filterObject from "../../hoc/mantine-table/filterTypes";
import { SimpleTable } from "../../hoc/mantine-table/SimpleTable";
import { OrganizationsRawType, OrganizationsRowItem } from "../../types/organizations";

function Organizations({ organizations }: OrganizationsRawType) {
  const columns = useMemo(
    (): Array<Column> => [
      {
        Header: "Alapszervezet azonosítója",
        accessor: "organization_id",
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
      {
        Header: "Leírás",
        accessor: "description",
      },
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
      {
        Header: "Jegyzetek",
        accessor: "notes",
      },
    ],
    []
  );
  const data = useMemo(() => organizations, []);
  const router = useRouter();

  return (
    <Container size="xl">
      <SimpleTable
        tableOptions={{
          columns: columns,
          data: data,
          initialState: {
            pageSize: 20,
            hiddenColumns: ["organization_id", "parent_organization_id", "description", "notes"],
          },
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
