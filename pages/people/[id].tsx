import Person from "../../components/person/person";
import type { SelectDataType, PersonDataType } from "../../components/person/person";
import { GetServerSideProps } from "next";

function PersonPage({
  personData,
  genderData,
  membershipFeeData,
  addressTypeData,
}: {
  personData: PersonDataType;
  genderData: Array<SelectDataType>;
  membershipFeeData: Array<SelectDataType>;
  addressTypeData: Array<SelectDataType>;
}) {
  return (
    <Person
      personData={personData}
      genderData={genderData}
      membershipFeeData={membershipFeeData}
      addressTypeData={addressTypeData}
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

  return {
    props: {
      personData: personData,
      genderData: genderData,
      membershipFeeData: membershipFeeData,
      addressTypeData: addressTypeData,
    },
  };
};
