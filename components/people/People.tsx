import { Container, Divider, Grid, Pagination, Text } from "@mantine/core";
import { useState } from "react";
import { PeopleRawType, PeopleType } from "../../types/people";
import { PeopleRow } from "./PeopleRow";

function People({ people, page, page_size, row_count, page_count }: PeopleRawType) {
  const [activePage, setPage] = useState(page + 1);
  const peopleRows = people.map((person) => (
    <PeopleRow
      key={person.id}
      id={person.id}
      registrationNumber={person.registration_number}
      membershipId={person.membership_id}
      name={person.person_name}
      birthDate={new Date(person.birthdate)}
      identityCardNumber={person.identity_card_number}
    />
  ));

  return (
    <Container size="xl">
      <Grid grow justify="space-between">
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
      {peopleRows}
      <Pagination
        onChange={setPage}
        mt="lg"
        page={activePage}
        style={{ justifyContent: "center" }}
        total={page_count + 1}
        withEdges
      />
    </Container>
  );
}

export { People };
