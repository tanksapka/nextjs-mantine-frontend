import { Button, Group, Pagination } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { GetServerSideProps } from "next";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { Organizations } from "../../components/organizations/Organizations";
import { SimpleTable } from "../../hoc/mantine-table/SimpleTable";
import { OrganizationsRawType } from "../../types/organizations";
import { getOrganizations } from "../../utils/organizations";

function OrganizationsIndex(organziationData: OrganizationsRawType) {
  const [data, setData] = useState(organziationData);
  const [activePage, setPage] = useState(organziationData.page + 1);
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
      {
        Header: "Leírás",
        accessor: "description",
      },
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
      {
        Header: "Jegyzet",
        accessor: "notes",
      },
    ],
    []
  );

  async function changeHandler(page: number) {
    const res = await getOrganizations(page - 1, organziationData.page_size);
    setPage(page);
    setData(res);
  }

  return (
    <>
      <Group mb="lg" position="right">
        <Button title="Új szervezet hozzáadása" leftIcon={<IconPlus size={20} />} name="new-organization" type="button">
          Új szervezet
        </Button>
      </Group>
      <Organizations {...data} />
      <Pagination
        onChange={changeHandler}
        mt="lg"
        page={activePage}
        style={{ justifyContent: "center" }}
        total={organziationData.page_count}
        withEdges
      />
      <SimpleTable columns={columns} data={data.organizations} />
    </>
  );
}

export default OrganizationsIndex;

export const getServerSideProps: GetServerSideProps = async () => {
  const organziationData = await getOrganizations(0, 20);

  if (!organziationData) {
    return {
      notFound: true,
    };
  }

  return {
    props: organziationData,
  };
};
