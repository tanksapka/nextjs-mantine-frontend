import axios from "axios";
import { MappingDataType, MappingPropsType, MappingRawDataType } from "../types/mappings";
import { convertToBool, convertToBoolString } from "./util";

async function getMappings(): Promise<MappingPropsType> {
  const resAddress = await axios.get(`${process.env.REACT_APP_API_URL}/address-types`);
  const resEmail = await axios.get(`${process.env.REACT_APP_API_URL}/email-types`);
  const resPhone = await axios.get(`${process.env.REACT_APP_API_URL}/phone-types`);
  const resGender = await axios.get(`${process.env.REACT_APP_API_URL}/genders`);
  const resMembershipFee = await axios.get(`${process.env.REACT_APP_API_URL}/membership-fee-categories`);

  return {
    genderTypeData: await resGender.data,
    membershipFeeTypeData: await resMembershipFee.data,
    addressTypeData: await resAddress.data,
    emailTypeData: await resEmail.data,
    phoneTypeData: await resPhone.data,
  };
}

async function sendMappings(mappingType: string, mappingData: Array<MappingDataType>): Promise<MappingDataType> {
  const res = await axios.post(`http://127.0.0.1:8000/${mappingType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: mappingData.map((item) => ({ ...item, valid_flag: convertToBoolString(item.valid_flag) })),
  });
  return await res.data.map((item: MappingRawDataType) => ({ ...item, valid_flag: convertToBool(item.valid_flag) }));
}

export { getMappings, sendMappings };
