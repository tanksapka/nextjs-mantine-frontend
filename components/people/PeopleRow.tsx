import { Group, Text } from "@mantine/core";
import React from "react";

interface PeopleRowType {
  registrationNumber: string;
  membershipId: string;
  name: string;
  birthDate: Date;
  identityCardNumber: string;
}

function PeopleRow({ registrationNumber, membershipId, name, birthDate, identityCardNumber }: PeopleRowType) {
  return (
    <Group>
      <Text>{registrationNumber}</Text>
      <Text>{membershipId}</Text>
      <Text>{name}</Text>
      <Text>{birthDate}</Text>
      <Text>{identityCardNumber}</Text>
    </Group>
  );
}

export default PeopleRow;
