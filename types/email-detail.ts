import * as Yup from "yup";

interface EmailBaseType {
  id: string;
  email_type_id: string;
  email: string;
  messenger: string;
  skype: string;
}

interface EmailBaseBoolType extends Omit<EmailBaseType, "messenger" | "skype"> {
  messenger: boolean;
  skype: boolean;
}

interface EmailDetailType extends EmailBaseType {
  person_id: string;
}

interface OrgEmailDetailType extends EmailBaseType {
  organization_id: string;
}

interface EmailFormType extends Omit<EmailDetailType, "messenger" | "skype"> {
  messenger: boolean;
  skype: boolean;
}

interface OrgEmailFormType extends Omit<OrgEmailDetailType, "messenger" | "skype"> {
  messenger: boolean;
  skype: boolean;
}

const defaultEmail: EmailBaseBoolType = {
  id: "",
  email_type_id: "",
  email: "",
  messenger: false,
  skype: false,
};

function defaultEmailData(personId: string): EmailFormType {
  return { ...defaultEmail, person_id: personId };
}

function defaultOrgEmailData(organizationId: string): OrgEmailFormType {
  return { ...defaultEmail, organization_id: organizationId };
}

const emailsValidation = Yup.array()
  .of(
    Yup.object().shape({
      email_type_id: Yup.string().required("Email típus kitöltése kötelező"),
      email: Yup.string().email("Valós email címet ajd meg").required("Email kitöltése kötelező"),
      messenger: Yup.bool().default(false),
      skype: Yup.bool().default(false),
    })
  )
  .test("UniqueEmail", "Email típusa nem ismétlődhet", (values, ctx) => {
    const extracted = values ? values.map((data) => data.email_type_id) : [];
    const uniqueData = Array.from(new Set(extracted));
    const countMap = extracted.reduce((prev, current) => prev.set(current, (prev.get(current) || 0) + 1), new Map());
    if (uniqueData.length === extracted?.length) return true;
    const errors = extracted.map((item, idx) =>
      countMap.get(item) > 1 ? ctx.createError({ path: `${ctx.path}.${idx}.email_type_id` }) : false
    );
    return errors.filter((err) => err !== false).at(-1) || true;
  });

export type { EmailBaseType, EmailDetailType, EmailFormType, OrgEmailDetailType, OrgEmailFormType };
export { emailsValidation, defaultEmailData, defaultOrgEmailData };
