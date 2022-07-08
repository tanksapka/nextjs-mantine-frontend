import { MappingDataType, MappingPropsType, MappingRawDataType } from "../types/mappings";
import { apiClient } from "./client";
import { convertToBool, convertToBoolString } from "./util";

async function getMappings(): Promise<MappingPropsType> {
  const res = await apiClient.get(`/mappings`);

  return {
    genderTypeData: await res.data.gender_type,
    membershipFeeTypeData: await res.data.membership_fee_type,
    addressTypeData: await res.data.address_type,
    emailTypeData: await res.data.email_type,
    phoneTypeData: await res.data.phone_type,
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
