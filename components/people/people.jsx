import { Group } from "@mantine/core";
import PeopleRow from "./people-row";

function People(peopleData) {
  return (
    <Group direction="column">
      <PeopleRow registrationNumber="1" membershipId="01" name="Test 1" birthDate={Date()} identityCardNumber="A1" />
      <div>People</div>
      <div>People</div>
      <div>People</div>
    </Group>
  );
}

export default People;
