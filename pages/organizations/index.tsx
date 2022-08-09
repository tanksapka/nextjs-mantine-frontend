import { Button, Group, LoadingOverlay } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { Organizations } from "../../components/organizations/Organizations";
import { OrganizationsRawType } from "../../types/organizations";
import { getOrganizations } from "../../utils/organizations";

function OrganizationsIndex(organziationData: OrganizationsRawType) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { isLoading, isFetching, data } = useQuery(["organizations", page], () => getOrganizations(page), {
    initialData: organziationData,
  });
  // console.log(data?.page_count);

  return (
    <>
      <LoadingOverlay visible={isLoading || isFetching} />
      <Group mb="lg" position="right">
        <Button
          title="Új szervezet hozzáadása"
          leftIcon={<IconPlus size={20} />}
          name="new-organization"
          type="button"
          onClick={() => router.push("/organizations/new")}
        >
          Új szervezet
        </Button>
      </Group>
      <Organizations {...(data as OrganizationsRawType)} />
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
