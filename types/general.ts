interface SelectDataType {
  value: string;
  label: string;
}

interface ContactDetailType {
  address: Array<any>;
  email: Array<any>;
  phone: Array<any>;
}

interface ParentOrganizationsType {
  organization_id: string;
  organization_name: string;
}

export type { ContactDetailType, SelectDataType, ParentOrganizationsType };
