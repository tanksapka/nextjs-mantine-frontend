import { Container, Divider, Grid, Text } from "@mantine/core";
import { useMemo } from "react";
import { Column } from "react-table";
import { SimpleTable } from "../../hoc/mantine-table/SimpleTable";
import { OrganizationsRawType } from "../../types/organizations";
import { convertToBool } from "../../utils/util";
import { OrganizationsRow } from "./OrganizationsRow";

function Organizations({ organizations }: OrganizationsRawType) {
  const columns = useMemo(
    (): Array<Column> => [
      {
        Header: "Alapszervezet azonosítója",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Alapszervezet neve",
        accessor: "organization_name",
      },
      {
        Header: "Szülőszervezet azonosítója",
        accessor: "parent_organization_id",
      },
      {
        Header: "Szülőszervezet neve",
        accessor: "parent_organization_name",
      },
      // {
      //   Header: "Leírás",
      //   accessor: "description",
      // },
      {
        Header: "Fogad tagokat?",
        accessor: "accepts_members_flag",
      },
      {
        Header: "Alapítás dátuma",
        accessor: "establishment_date",
      },
      {
        Header: "Megszűnés dátuma",
        accessor: "termination_date",
      },
      // {
      //   Header: "Jegyzet",
      //   accessor: "notes",
      // },
    ],
    []
  );
  const data = useMemo(() => organizations, []);
  // const organizationsRows = organizations.map((organization) => (
  //   <OrganizationsRow
  //     key={organization.id}
  //     id={organization.id}
  //     organization_name={organization.organization_name}
  //     parent_organization_name={organization.parent_organization_name}
  //     accepts_members_flag={convertToBool(organization.accepts_members_flag)}
  //     establishment_date={organization.establishment_date ? new Date(organization.establishment_date) : undefined}
  //     termination_date={organization.termination_date ? new Date(organization.termination_date) : undefined}
  //   />
  // ));

  return (
    <Container size="xl">
      {/* <Grid grow justify="space-between">
        <Grid.Col span={2}>
          <Text weight={700}>Alapszervezet neve</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text weight={700}>Szülőszervezet neve</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text weight={700}>Fogad tagokat?</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text weight={700}>Alapítás dátuma</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text weight={700}>Megszűnés dátuma</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text weight={700}>Szerk.</Text>
        </Grid.Col>
      </Grid>
      <Divider size="xs" color="dark" /> */}
      {/* {organizationsRows} */}
      <SimpleTable columns={columns} data={data} />
    </Container>
  );
}

export { Organizations };
