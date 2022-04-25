import * as Yup from "yup";

interface MappingRawDataType {
  id: string;
  created_on: string;
  created_by: string;
  name: string;
  description?: string;
  valid_flag: "Y" | "N";
}

interface MappingDataType {
  id: string;
  created_on: Date;
  created_by: string;
  name: string;
  description?: string;
  valid_flag: boolean;
}

interface MappingPropsType {
  genderTypeData: Array<MappingRawDataType>;
  membershipFeeTypeData: Array<MappingRawDataType>;
  addressTypeData: Array<MappingRawDataType>;
  emailTypeData: Array<MappingRawDataType>;
  phoneTypeData: Array<MappingRawDataType>;
}

const defaultMapping: MappingDataType = {
  id: "",
  created_on: new Date(),
  created_by: "",
  name: "",
  description: "",
  valid_flag: true,
};

const mappingValidation = Yup.object().shape({
  created_on: Yup.date().required(),
  created_by: Yup.string().required(),
  name: Yup.string().required("Típus név kitöltése kötelező"),
  description: Yup.string().nullable(),
  valid_flag: Yup.boolean().default(true).required(),
});

export { defaultMapping, mappingValidation };
export type { MappingDataType, MappingRawDataType, MappingPropsType };
