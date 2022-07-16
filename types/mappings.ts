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
  id?: string;
  created_on: Date;
  created_by?: string;
  name?: string;
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
  id: undefined,
  created_on: new Date(),
  created_by: undefined,
  name: "",
  description: "",
  valid_flag: true,
};

const mappingValidation = Yup.array()
  .of(
    Yup.object().shape({
      created_on: Yup.date().required(),
      created_by: Yup.string().required(),
      name: Yup.string()
        .required("Típus név kitöltése kötelező")
        .max(255, "Típus nem lehet hosszabb mint 255 karakter"),
      description: Yup.string().nullable().max(255, "Típus nem lehet hosszabb mint 255 karakter"),
      valid_flag: Yup.boolean().default(true).required(),
    })
  )
  .test("UniqueName", "Típus értéke nem ismétlődhet", (values, ctx) => {
    const extracted = values ? values.map((data) => data.name) : [];
    const uniqueData = Array.from(new Set(extracted));
    const countMap = extracted.reduce((prev, current) => prev.set(current, (prev.get(current) || 0) + 1), new Map());
    if (uniqueData.length === extracted?.length) return true;
    const errors = extracted.map((item, idx) =>
      countMap.get(item) > 1 ? ctx.createError({ path: `${ctx.path}.${idx}.name` }) : false
    );
    return errors.filter((err) => err !== false).at(-1) || true;
  });

export { defaultMapping, mappingValidation };
export type { MappingDataType, MappingRawDataType, MappingPropsType };
