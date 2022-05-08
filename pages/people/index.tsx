import { Pagination } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { People } from "../../components/people/People";
import { PeopleRawType } from "../../types/people";
import { getPeople } from "../../utils/people";

function PeopleIndex(peopleData: PeopleRawType) {
  const [data, setData] = useState(peopleData);
  const [activePage, setPage] = useState(peopleData.page + 1);

  async function changeHandler(page: number) {
    const res = await getPeople(page - 1, peopleData.page_size);
    setPage(page);
    setData(res);
  }

  return (
    <>
      <People {...data} />
      <Pagination
        onChange={changeHandler}
        mt="lg"
        page={activePage}
        style={{ justifyContent: "center" }}
        total={peopleData.page_count}
        withEdges
      />
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
