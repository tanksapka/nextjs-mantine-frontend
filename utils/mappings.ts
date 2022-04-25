import { SelectDataType } from "../types/general";
import { MappingPropsType } from "../types/mappings";

async function getAddressTypes(): Promise<Array<SelectDataType>> {
  const resAddressType = await fetch(`${process.env.REACT_APP_API_URL}/address-types`);
  return await resAddressType.json().then((data) => data.map((item: any) => ({ value: item.id, label: item.name })));
}

async function getEmailTypes(): Promise<Array<SelectDataType>> {
  const resEmailType = await fetch(`${process.env.REACT_APP_API_URL}/email-types`);
  return await resEmailType.json().then((data) => data.map((item: any) => ({ value: item.id, label: item.name })));
}

async function getPhoneTypes(): Promise<Array<SelectDataType>> {
  const resPhoneType = await fetch(`${process.env.REACT_APP_API_URL}/phone-types`);
  return await resPhoneType.json().then((data) => data.map((item: any) => ({ value: item.id, label: item.name })));
}

async function getGenderTypes(): Promise<Array<SelectDataType>> {
  const resGender = await fetch(`${process.env.REACT_APP_API_URL}/genders`);
  return await resGender.json().then((data) => data.map((item: any) => ({ value: item.id, label: item.name })));
}

async function getMembershipFeeTypes(): Promise<Array<SelectDataType>> {
  const resMembershipFee = await fetch(`${process.env.REACT_APP_API_URL}/membership-fee-categories`);
  return await resMembershipFee.json().then((data) => data.map((item: any) => ({ value: item.id, label: item.name })));
}

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

export { getAddressTypes, getEmailTypes, getGenderTypes, getMappings, getMembershipFeeTypes, getPhoneTypes };
