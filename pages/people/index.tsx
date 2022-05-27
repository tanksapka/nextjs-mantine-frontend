import { Button, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { GetServerSideProps } from "next";
import { People } from "../../components/people/People";
import { PeopleRawType } from "../../types/people";
import { getPeople } from "../../utils/people";

function PeopleIndex(peopleData: PeopleRawType) {
  return (
    <>
      <Group mb="lg" position="right">
        <Button title="Új személy hozzáadása" leftIcon={<IconPlus size={20} />} name="new-person" type="button">
          Új személy
        </Button>
      </Group>
      <People {...peopleData} />
    </>
  );
}

export default PeopleIndex;

export const getServerSideProps: GetServerSideProps = async () => {
  const peopleData = await getPeople(0, 20);

  if (!peopleData) {
    return {
      notFound: true,
    };
  }

  return {
    props: peopleData,
  };
};
