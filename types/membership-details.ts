interface PersonMembershipDetailRawType {
  id: string;
  person_id: string;
  organization_id: string;
  organization_name: string;
  active_flag: string;
  inactivity_status_id?: string;
  event_date?: string;
  notes?: string;
}

interface PersonMembershipDetailType {
  id: string;
  person_id: string;
  organization_id: string;
  organization_name: string;
  active_flag: boolean;
  inactivity_status_id?: string;
  event_date?: Date;
  notes?: string;
}

interface OrganziationMembershipDetailRawType {
  id: string;
  person_id: string;
  person_name: string;
  organization_id: string;
  active_flag: string;
  inactivity_status_id?: string;
  event_date?: string;
  notes?: string;
}

interface OrganziationMembershipDetailType {
  id: string;
  person_id: string;
  organization_id: string;
  organization_name: string;
  active_flag: boolean;
  inactivity_status_id?: string;
  event_date?: Date;
  notes?: string;
}

export type {
  PersonMembershipDetailRawType,
  PersonMembershipDetailType,
  OrganziationMembershipDetailRawType,
  OrganziationMembershipDetailType,
};
