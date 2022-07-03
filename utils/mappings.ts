import { MappingDataType, MappingPropsType, MappingRawDataType } from "../types/mappings";
import { apiClient } from "./client";
import { convertToBool, convertToBoolString } from "./util";

async function getMappings(): Promise<MappingPropsType> {
  const resAddress = await apiClient.get(`/address-types`);
  const resEmail = await apiClient.get(`/email-types`);
  const resPhone = await apiClient.get(`/phone-types`);
  const resGender = await apiClient.get(`/genders`);
  const resMembershipFee = await apiClient.get(`/membership-fee-categories`);

  return {
    genderTypeData: await resGender.data,
    membershipFeeTypeData: await resMembershipFee.data,
    addressTypeData: await resAddress.data,
    emailTypeData: await resEmail.data,
    phoneTypeData: await resPhone.data,
  };
}

async function sendMappings(mappingType: string, mappingData: Array<MappingDataType>): Promise<MappingDataType> {
  const res = await apiClient.post(`/${mappingType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: mappingData.map((item) => ({ ...item, valid_flag: convertToBoolString(item.valid_flag) })),
  });
  return await res.data.map((item: MappingRawDataType) => ({ ...item, valid_flag: convertToBool(item.valid_flag) }));
}

export { getMappings, sendMappings };
