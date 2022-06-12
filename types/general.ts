import { FormList } from "@mantine/form/lib/form-list/form-list";

interface SelectDataType {
  value: string;
  label: string;
}

interface ContactDetailType {
  address: FormList<any>;
  email: FormList<any>;
  phone: FormList<any>;
}

interface ParentOrganizationsType {
  organization_id: string;
  organization_name: string;
}

export type { ContactDetailType, SelectDataType, ParentOrganizationsType };
