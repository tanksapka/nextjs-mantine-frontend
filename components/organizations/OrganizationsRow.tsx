import { ActionIcon, Center, Checkbox, Divider, Grid, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import Link from "next/link";

interface OrganizationsRowType {
  id: string;
  organization_name: string;
  parent_organization_name: string;
  accepts_members_flag: boolean;
  establishment_date?: Date;
  termination_date?: Date;
}

function OrganizationsRow({
  id,
  organization_name,
  parent_organization_name,
  accepts_members_flag,
  establishment_date,
  termination_date,
}: OrganizationsRowType) {
  return (
    <>
      <Grid grow justify="space-between" align="baseline">
        <Grid.Col span={2}>
          <Text>{organization_name}</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text>{parent_organization_name}</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Checkbox readOnly checked={accepts_members_flag} />
        </Grid.Col>
        <Grid.Col span={2}>
          <Text>{establishment_date?.toLocaleDateString()}</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text>{termination_date?.toLocaleDateString()}</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <ActionIcon component={Link} href={`/organizations/${id}`} passHref>
            <a>
              <IconPencil style={{ color: "#1c7ed6" }} />
            </a>
          </ActionIcon>
        </Grid.Col>
      </Grid>
      <Divider size="xs" color="dark" />
    </>
  );
}

export { OrganizationsRow };
