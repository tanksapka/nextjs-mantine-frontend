import { GetServerSideProps } from "next";
import { Organization, OrganizationDataType } from "../../components/organization/Organization";

function OrganizationPage({ organizationData }: { organizationData: OrganizationDataType }) {
  return <Organization organizationData={organizationData} />;
}

export default OrganizationPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`${process.env.REACT_APP_API_URL}/organizations/${id}`);
  const organizationData = await res.json();

  if (!organizationData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      organizationData: organizationData,
    },
  };
};
