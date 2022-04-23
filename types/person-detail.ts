import * as Yup from "yup";
import { AddressDetailType } from "./address-detail";
import { EmailDetailType } from "./email-detail";
import { ContactDetailType } from "./general";
import { PhoneDetailType } from "./phone-detail";

interface PersonDetailType {
  id: string;
  registration_number: number;
  membership_id: string;
  person_name: string;
  birthdate: string;
  mother_name: string;
  gender_id: string;
  gender_name: string;
  identity_card_number: string;
  membership_fee_category_id: string;
  membership_fee_category_name: string;
  notes: string;
}

interface PersonDetailFormType extends ContactDetailType {
  registration_number: number;
  membership_id: string;
  person_name: string;
  birthdate: Date;
  mother_name: string;
  gender_id?: string;
  identity_card_number?: string;
  membership_fee_category_id: string;
  notes?: string;
}

interface MembershipDetailType {
  id: string;
  person_id: string;
  organization_id: string;
  organization_name: string;
  active_flag: string;
  inactivity_status_id: string;
  event_date: string;
  notes: string;
}

interface PersonDataType {
  person: PersonDetailType;
  address: Array<AddressDetailType>;
  email: Array<EmailDetailType>;
  phone: Array<PhoneDetailType>;
  membership: Array<MembershipDetailType>;
}

const personValidation = {
  registration_number: Yup.number(),
  membership_id: Yup.string(),
  person_name: Yup.string().required("Név kitöltése kötelező"),
  birthdate: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("Születési dátum kitöltése kötelező"),
  mother_name: Yup.string().required("Anyja neve kitöltése kötelező"),
  gender_id: Yup.string().nullable(),
  identity_card_number: Yup.string().nullable(),
  membership_fee_category_id: Yup.string().required("Tagdíj kategória kitöltése kötelező"),
  notes: Yup.string().nullable(),
};

export type { PersonDetailType, PersonDetailFormType, PersonDataType };
export { personValidation };
