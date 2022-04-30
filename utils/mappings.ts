import { MappingPropsType } from "../types/mappings";

async function getMappings(): Promise<MappingPropsType> {
  const resAddress = await fetch(`${process.env.REACT_APP_API_URL}/address-types`);
  const resEmail = await fetch(`${process.env.REACT_APP_API_URL}/email-types`);
  const resPhone = await fetch(`${process.env.REACT_APP_API_URL}/phone-types`);
  const resGender = await fetch(`${process.env.REACT_APP_API_URL}/genders`);
  const resMembershipFee = await fetch(`${process.env.REACT_APP_API_URL}/membership-fee-categories`);

  return {
    genderTypeData: await resGender.json(),
    membershipFeeTypeData: await resMembershipFee.json(),
    addressTypeData: await resAddress.json(),
    emailTypeData: await resEmail.json(),
    phoneTypeData: await resPhone.json(),
  };
}

export { getMappings };
