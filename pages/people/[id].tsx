import Person from "../../components/person/person";
import type { SelectDataType, PersonDataType } from "../../components/person/person";
import { GetServerSideProps } from "next";

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

  const resGender = await fetch(`${process.env.REACT_APP_API_URL}/genders`);
  const genderData = await resGender
    .json()
    .then((data) => data.map((item: any) => ({ value: item.id, label: item.name })));

  const resMembershipFee = await fetch(`${process.env.REACT_APP_API_URL}/membership-fee-categories`);
  const membershipFeeData = await resMembershipFee
    .json()
    .then((data) => data.map((item: any) => ({ value: item.id, label: item.name })));

  const resAddressType = await fetch(`${process.env.REACT_APP_API_URL}/address-types`);
  const addressTypeData = await resAddressType
    .json()
    .then((data) => data.map((item: any) => ({ value: item.id, label: item.name })));

  const resEmailType = await fetch(`${process.env.REACT_APP_API_URL}/email-types`);
  const emailTypeData = await resEmailType
    .json()
    .then((data) => data.map((item: any) => ({ value: item.id, label: item.name })));

  const resPhoneType = await fetch(`${process.env.REACT_APP_API_URL}/phone-types`);
  const phoneTypeData = await resPhoneType
    .json()
    .then((data) => data.map((item: any) => ({ value: item.id, label: item.name })));

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
