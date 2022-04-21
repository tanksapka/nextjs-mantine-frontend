import { GetServerSideProps } from "next";
import { SelectDataType } from "../../types/general";
import { getAddressTypes, getEmailTypes, getPhoneTypes } from "../../utils/mappings";

function OrganizationPage({
  organizationData,
  addressTypeData,
  emailTypeData,
  phoneTypeData,
}: {
  organizationData: any;
  addressTypeData: Array<SelectDataType>;
  emailTypeData: Array<SelectDataType>;
  phoneTypeData: Array<SelectDataType>;
}) {
  return <div>Org page</div>;
}

export { OrganizationPage };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`${process.env.REACT_APP_API_URL}/organizations/${id}`);
  const organizationData = await res.json();

  if (!organizationData) {
    return {
      notFound: true,
    };
  }

  const addressTypeData = await getAddressTypes();
  const emailTypeData = await getEmailTypes();
  const phoneTypeData = await getPhoneTypes();

  return {
    props: {
      organizationData: organizationData,
      addressTypeData: addressTypeData,
      emailTypeData: emailTypeData,
      phoneTypeData: phoneTypeData,
    },
  };
};
