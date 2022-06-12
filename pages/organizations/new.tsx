import { GetServerSideProps } from "next";
import { Organization, OrganizationDataType } from "../../components/organization/Organization";

function NewOrganizationPage({ organizationData }: { organizationData: OrganizationDataType }) {
  return <Organization organizationData={organizationData} />;
}

export default NewOrganizationPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/organization-mappings/`);
  const mappingData = await res.json();

  if (!mappingData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      organizationData: mappingData,
    },
  };
};
