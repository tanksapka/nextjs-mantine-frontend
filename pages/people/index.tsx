import { GetServerSideProps } from "next";
import { People } from "../../components/people/People";
import { PeopleRawType } from "../../types/people";

function PeopleIndex({ peopleData }: { peopleData: Array<PeopleRawType> }) {
  return <People peopleData={peopleData} />;
}

export default PeopleIndex;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/people`);
  const peopleData = await res.json();

  if (!peopleData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      peopleData: peopleData,
    },
  };
};
