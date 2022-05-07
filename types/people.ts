interface PeopleRawType {
  people: Array<{
    id: string;
    registration_number: number;
    membership_id: string;
    person_name: string;
    birthdate: string;
    mother_name: string;
    gender_id?: string;
    gender_name?: string;
    identity_card_number?: string;
    membership_fee_category_id: string;
    membership_fee_category_name: string;
    notes?: string;
  }>;
  page: number;
  page_size: number;
  row_count: number;
  page_count: number;
}

interface PeopleType {
  people: Array<{
    id: string;
    registration_number: number;
    membership_id: string;
    person_name: string;
    birthdate: Date;
    mother_name: string;
    gender_id?: string;
    gender_name?: string;
    identity_card_number?: string;
    membership_fee_category_id: string;
    membership_fee_category_name: string;
    notes?: string;
  }>;
  page: number;
  page_size: number;
  row_count: number;
  page_count: number;
}

export type { PeopleRawType, PeopleType };
