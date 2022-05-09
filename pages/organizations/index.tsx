import { Pagination } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Organizations } from "../../components/organizations/Organizations";
import { OrganizationsRawType } from "../../types/organizations";
import { getOrganizations } from "../../utils/organizations";

function OrganizationsIndex(organziationData: OrganizationsRawType) {
  const [data, setData] = useState(organziationData);
  const [activePage, setPage] = useState(organziationData.page + 1);

  async function changeHandler(page: number) {
    const res = await getOrganizations(page - 1, organziationData.page_size);
    setPage(page);
    setData(res);
  }

  return (
    <>
      <Organizations {...data} />
      <Pagination
        onChange={changeHandler}
        mt="lg"
        page={activePage}
        style={{ justifyContent: "center" }}
        total={organziationData.page_count}
        withEdges
      />
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
