import { ActionIcon, Divider, Grid, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import Link from "next/link";

interface PeopleRowType {
  id: string;
  registrationNumber: number;
  membershipId: string;
  name: string;
  birthDate: Date;
  identityCardNumber?: string;
}

function PeopleRow({ id, registrationNumber, membershipId, name, birthDate, identityCardNumber }: PeopleRowType) {
  return (
    <>
      <Grid grow justify="space-between">
        <Grid.Col span={1}>
          <Text>{registrationNumber}</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text>{membershipId}</Text>
        </Grid.Col>
        <Grid.Col span={5}>
          <Text>{name}</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text>{birthDate.toLocaleDateString()}</Text>
        </Grid.Col>
        <Grid.Col span={1}>
          <Text>{identityCardNumber}</Text>
        </Grid.Col>
        <Grid.Col span={1}>
          {/* <ActionIcon<typeof Link> color="blue" component={Link} href={`/people/${id}`} passHref >
          <ActionIcon color="blue" title="Szerkesztés">
            <IconPencil />
          </ActionIcon> */}
          <Link href={`/people/${id}`} passHref>
            Szerk...
          </Link>
        </Grid.Col>
      </Grid>
      <Divider size="xs" color="dark" />
    </>
  );
}

export { PeopleRow };
