interface PeopleRawType {
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
}

interface PeopleType {
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
}

export type { PeopleRawType, PeopleType };
