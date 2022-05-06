import { Container, Group } from "@mantine/core";
import { PeopleRawType, PeopleType } from "../../types/people";
import { PeopleRow } from "./PeopleRow";

function People({ peopleData }: { peopleData: Array<PeopleRawType> }) {
  const peopleRows = peopleData.map((person) => (
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

  return <Container size="xl">{peopleRows}</Container>;
}

export { People };
