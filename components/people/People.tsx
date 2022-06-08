import { ActionIcon, Container } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Column, Row } from "react-table";
import { DateFilter, NumberFilter, StringFilter } from "../../hoc/mantine-table/filters";
import filterObject from "../../hoc/mantine-table/filterTypes";
import { SimpleTable } from "../../hoc/mantine-table/SimpleTable";
import { PeopleRawType, PeopleRowItem } from "../../types/people";

function People({ people }: PeopleRawType) {
  const columns = useMemo(
    (): Array<Column> => [
      {
        Header: "Személy azonosítója",
        accessor: "id",
      },
      {
        Header: "Reg. szám",
        accessor: "registration_number",
        Filter: StringFilter,
        filter: filterObject.stringFilter,
      },
      {
        Header: "Tagsági szám",
        accessor: "membership_id",
        Filter: NumberFilter,
        filter: filterObject.numberFilter,
      },
      {
        Header: "Név",
        accessor: "person_name",
        Filter: StringFilter,
        filter: filterObject.stringFilter,
      },
      {
        Header: "Születési dátum",
        accessor: "birthdate",
        Filter: DateFilter,
        filter: filterObject.dateFilter,
      },
      {
        Header: "Anyja neve",
        accessor: "mother_name",
      },
      {
        Header: "Nem azonosítója",
        accessor: "gender_id",
      },
      {
        Header: "Nem",
        accessor: "gender_name",
      },
      {
        Header: "Szem. ig. szám",
        accessor: "identity_card_number",
        Filter: StringFilter,
        filter: filterObject.stringFilter,
      },
      {
        Header: "Tagkategória azonosítója",
        accessor: "membership_fee_category_id",
      },
      {
        Header: "Tagkategória",
        accessor: "membership_fee_category_name",
      },
      {
        Header: "Jegyzet",
        accessor: "notes",
      },
    ],
    []
  );
  const data = useMemo(() => people, []);
  const router = useRouter();

  return (
    <Container size="xl">
      <SimpleTable
        tableOptions={{
          columns: columns,
          data: data,
          initialState: {
            pageSize: 20,
            hiddenColumns: [
              "id",
              "mother_name",
              "gender_id",
              "gender_name",
              "membership_fee_category_id",
              "membership_fee_category_name",
              "notes",
            ],
          },
        }}
        displayOptions={{
          hover: { header: true, row: true },
          stripedRows: true,
        }}
        interactionOptions={{
          rowIcons: (row) => {
            const rowOriginal = row.original as PeopleRowItem;
            return (
              <ActionIcon component={Link} href={`/people/${rowOriginal.person_id}`} passHref>
                <a title="Edit...">
                  <IconPencil style={{ color: "#1c7ed6" }} />
                </a>
              </ActionIcon>
            );
          },
          rowOnClick: (row: Row<object>) => {
            const rowOriginal = row.original as PeopleRowItem;
            router.push(`/people/${rowOriginal.person_id}`);
          },
        }}
      />
    </Container>
  );
}

export { People };
