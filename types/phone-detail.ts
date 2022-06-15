import * as Yup from "yup";

interface PhoneBaseType {
  id: string;
  phone_type_id: string;
  phone_number: string;
  phone_extension?: string;
  messenger: string;
  skype: string;
  viber: string;
  whatsapp: string;
}

interface PhoneBaseBoolType extends Omit<PhoneBaseType, "messenger" | "skype" | "viber" | "whatsapp"> {
  messenger: boolean;
  skype: boolean;
  viber: boolean;
  whatsapp: boolean;
}

interface PhoneDetailType extends PhoneBaseType {
  person_id: string;
}

interface OrgPhoneDetailType extends PhoneBaseType {
  organization_id: string;
}

interface PhoneFormType extends Omit<PhoneDetailType, "messenger" | "skype" | "viber" | "whatsapp"> {
  messenger: boolean;
  skype: boolean;
  viber: boolean;
  whatsapp: boolean;
}

interface OrgPhoneFormType extends Omit<OrgPhoneDetailType, "messenger" | "skype" | "viber" | "whatsapp"> {
  messenger: boolean;
  skype: boolean;
  viber: boolean;
  whatsapp: boolean;
}

const defaultPhone: PhoneBaseBoolType = {
  id: "",
  phone_type_id: "",
  phone_number: "",
  phone_extension: "",
  messenger: false,
  skype: false,
  viber: false,
  whatsapp: false,
};

function defaultPhoneData(personId: string): PhoneFormType {
  return { ...defaultPhone, person_id: personId };
}

function defaultOrgPhoneData(organizationId: string): OrgPhoneFormType {
  return { ...defaultPhone, organization_id: organizationId };
}

const phoneValidation = Yup.array()
  .of(
    Yup.object().shape({
      phone_type_id: Yup.string().required("Telefonszám típus kitöltése kötelező"),
      phone_number: Yup.string().required("Telefonszám kitöltése kötelező"),
      phone_extension: Yup.string(),
      messenger: Yup.bool().default(false),
      skype: Yup.bool().default(false),
      viber: Yup.bool().default(false),
      whatsapp: Yup.bool().default(false),
    })
  )
  .test("UniquePhone", "Telefonszám típusa nem ismétlődhet", (values, ctx) => {
    const extracted = values ? values.map((data) => data.phone_type_id) : [];
    const uniqueData = Array.from(new Set(extracted));
    const countMap = extracted.reduce((prev, current) => prev.set(current, (prev.get(current) || 0) + 1), new Map());
    if (uniqueData.length === extracted?.length) return true;
    const errors = extracted.map((item, idx) =>
      countMap.get(item) > 1 ? ctx.createError({ path: `${ctx.path}.${idx}.phone_type_id` }) : false
    );
    return errors.filter((err) => err !== false).at(-1) || true;
  });

export type { PhoneBaseType, PhoneDetailType, PhoneFormType, OrgPhoneDetailType, OrgPhoneFormType };
export { phoneValidation, defaultPhoneData, defaultOrgPhoneData };
