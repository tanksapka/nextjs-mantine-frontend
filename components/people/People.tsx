import { Container, Divider, Grid, Text } from "@mantine/core";
import { PeopleRawType } from "../../types/people";
import { PeopleRow } from "./PeopleRow";

function People({ people }: PeopleRawType) {
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
    </Container>
  );
}

export { People };
