interface OrganizationsRowItem {
  organization_id: string;
  organization_name: string;
  parent_organization_id: string;
  parent_organization_name: string;
  description?: string;
  accepts_members_flag: string;
  establishment_date?: string;
  termination_date?: string;
  notes?: string;
}

interface OrganizationsRawType {
  organizations: Array<OrganizationsRowItem>;
  page: number;
  page_size: number;
  row_count: number;
  page_count: number;
}

interface OrganizationsType {
  organizations: Array<{
    organization_id: string;
    organization_name: string;
    parent_organization_id: string;
    parent_organization_name: string;
    description?: string;
    accepts_members_flag: boolean;
    establishment_date?: Date;
    termination_date?: Date;
    notes?: string;
  }>;
  page: number;
  page_size: number;
  row_count: number;
  page_count: number;
}

export type { OrganizationsRowItem, OrganizationsRawType, OrganizationsType };
