import * as Yup from "yup";

interface OrganizationDetailType {
  id: string;
  organization_name: string;
  parent_organization_id: string;
  parent_organization_name: string;
  description: string;
  accepts_members_flag: string;
  establishment_date: string;
  termination_date: string;
  notes: string;
}

const organizationValidation = {
  organization_name: Yup.string().required("Alapszervezet név kitöltése kötelező"),
  description: Yup.string().nullable(),
  accepts_members_flag: Yup.boolean().default(false).required("Kötelezően kitöltendő"),
  establishment_date: Yup.date().required("Alapítás dátum kitöltése kötelező"),
  termination_date: Yup.date().nullable(),
  notes: Yup.string().nullable(),
};

export type { OrganizationDetailType };
export { organizationValidation };
