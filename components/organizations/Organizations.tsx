import { Container } from "@mantine/core";
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
      <SimpleTable columns={columns} data={data} />
    </Container>
  );
}

export { Organizations };
