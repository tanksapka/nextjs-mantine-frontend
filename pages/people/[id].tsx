import { PersonDataType, Person } from "../../components/person/person";
import { SelectDataType } from "../../types/general";
import { GetServerSideProps } from "next";
import {
  getAddressTypes,
  getEmailTypes,
  getGenderTypes,
  getMembershipFeeTypes,
  getPhoneTypes,
} from "../../utils/mappings";

function PersonPage({
  personData,
  genderData,
  membershipFeeData,
  addressTypeData,
  emailTypeData,
  phoneTypeData,
}: {
  personData: PersonDataType;
  genderData: Array<SelectDataType>;
  membershipFeeData: Array<SelectDataType>;
  addressTypeData: Array<SelectDataType>;
  emailTypeData: Array<SelectDataType>;
  phoneTypeData: Array<SelectDataType>;
}) {
  return (
    <Person
      personData={personData}
      genderData={genderData}
      membershipFeeData={membershipFeeData}
      addressTypeData={addressTypeData}
      emailTypeData={emailTypeData}
      phoneTypeData={phoneTypeData}
    />
  );
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

  const genderData = await getGenderTypes();
  const membershipFeeData = await getMembershipFeeTypes();
  const addressTypeData = await getAddressTypes();
  const emailTypeData = await getEmailTypes();
  const phoneTypeData = await getPhoneTypes();

  return {
    props: {
      personData: personData,
      genderData: genderData,
      membershipFeeData: membershipFeeData,
      addressTypeData: addressTypeData,
      emailTypeData: emailTypeData,
      phoneTypeData: phoneTypeData,
    },
  };
};
