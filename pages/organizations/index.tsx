import { Button, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Organizations } from "../../components/organizations/Organizations";
import { OrganizationsRawType } from "../../types/organizations";
import { getOrganizations } from "../../utils/organizations";

function OrganizationsIndex(organziationData: OrganizationsRawType) {
  const router = useRouter();
  return (
    <>
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
      <Organizations {...organziationData} />
    </>
  );
}

export default OrganizationsIndex;

export const getServerSideProps: GetServerSideProps = async () => {
  const organziationData = await getOrganizations(0, 60);

  if (!organziationData) {
    return {
      notFound: true,
    };
  }

  return {
    props: organziationData,
  };
};
