import { Person } from "../../components/person/Person";
import { PersonDataType } from "../../types/person-detail";
import { GetServerSideProps } from "next";

function PersonPage({ personData }: { personData: PersonDataType }) {
  return <Person personData={personData} />;
}

export default PersonPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`${process.env.REACT_APP_API_URL}/people/${id}`);
  const personData = await res.json();

  if (!personData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      personData: personData,
    },
  };
};
