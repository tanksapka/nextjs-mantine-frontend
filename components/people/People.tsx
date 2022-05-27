import { Container, Divider, Grid, Text } from "@mantine/core";
import { useMemo } from "react";
import { Column } from "react-table";
import { DateFilter, NumberFilter, StringFilter } from "../../hoc/mantine-table/filters";
import filterObject from "../../hoc/mantine-table/filterTypes";
import { SimpleTable } from "../../hoc/mantine-table/SimpleTable";
import { PeopleRawType } from "../../types/people";
import { PeopleRow } from "./PeopleRow";

function People({ people }: PeopleRawType) {
  const columns = useMemo(
    (): Array<Column> => [
      {
        Header: "Szemály azonosítója",
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
      // {
      //   Header: "Anyja neve",
      //   accessor: "mother_name",
      // },
      // {
      //   Header: "Nem azonosítója",
      //   accessor: "gender_id",
      // },
      // {
      //   Header: "Nem",
      //   accessor: "gender_name",
      // },
      {
        Header: "Szem. ig. szám",
        accessor: "identity_card_number",
        Filter: StringFilter,
        filter: filterObject.stringFilter,
      },
      // {
      //   Header: "Tagkategória azonosítója",
      //   accessor: "membership_fee_category_id",
      // },
      // {
      //   Header: "Tagkategória",
      //   accessor: "membership_fee_category_name",
      // },
      // {
      //   Header: "Jegyzet",
      //   accessor: "notes",
      // },
    ],
    []
  );
  const data = useMemo(() => people, []);
  // const peopleRows = people.map((person) => (
  //   <PeopleRow
  //     key={person.id}
  //     id={person.id}
  //     registrationNumber={person.registration_number}
  //     membershipId={person.membership_id}
  //     name={person.person_name}
  //     birthDate={new Date(person.birthdate)}
  //     identityCardNumber={person.identity_card_number}
  //   />
  // ));

  return (
    <Container size="xl">
      {/* <Grid grow justify="space-between">
        <Grid.Col span={1}>
          <Text weight={700}>Reg. szám</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text weight={700}>Tagsági szám</Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text weight={700}>Név</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text weight={700}>Születési dátum</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text weight={700}>Szem. ig. szám</Text>
        </Grid.Col>
        <Grid.Col span={1}>
          <Text weight={700}>Szerk.</Text>
        </Grid.Col>
      </Grid>
      <Divider size="xs" color="dark" />
      {peopleRows} */}
      <SimpleTable columns={columns} data={data} />
    </Container>
  );
}

export { People };
