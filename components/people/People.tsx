import { Group } from "@mantine/core";
import PeopleRow from "./PeopleRow";

function People() {
  return (
    <Group direction="column">
      <PeopleRow
        registrationNumber="1"
        membershipId="01"
        name="Test 1"
        birthDate={new Date()}
        identityCardNumber="A1"
      />
      <div>People</div>
      <div>People</div>
      <div>People</div>
    </Group>
  );
}

export default People;
