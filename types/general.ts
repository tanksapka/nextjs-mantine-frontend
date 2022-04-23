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

export type { ContactDetailType, SelectDataType };
