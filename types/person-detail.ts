import * as Yup from "yup";
import { AddressDetailType } from "./address-detail";
import { EmailDetailType } from "./email-detail";
import { ContactDetailType, SelectDataType } from "./general";
import { PersonMembershipDetailRawType, PersonMembershipDetailType } from "./membership-details";
import { PhoneDetailType } from "./phone-detail";

interface PersonDetailType {
  person_id: string;
  registration_number: number;
  membership_id: string;
  person_name: string;
  birthdate?: string;
  mother_name?: string;
  gender_id?: string;
  gender_name?: string;
  identity_card_number?: string;
  membership_fee_category_id: string;
  membership_fee_category_name: string;
  notes?: string;
}

interface PersonDetailFormType extends ContactDetailType {
  registration_number: number;
  membership_id: string;
  person_name: string;
  birthdate?: Date;
  mother_name?: string;
  gender_id?: string;
  identity_card_number?: string;
  membership_fee_category_id: string;
  notes?: string;
  membership: Array<PersonMembershipDetailType>;
}

interface PersonDataType {
  person: PersonDetailType;
  address: Array<AddressDetailType>;
  email: Array<EmailDetailType>;
  phone: Array<PhoneDetailType>;
  membership: Array<PersonMembershipDetailRawType>;
  gender_type: Array<SelectDataType>;
  membership_fee_type: Array<SelectDataType>;
  address_type: Array<SelectDataType>;
  email_type: Array<SelectDataType>;
  phone_type: Array<SelectDataType>;
}

const personValidation = {
  registration_number: Yup.number(),
  membership_id: Yup.string(),
  person_name: Yup.string().required("Név kitöltése kötelező"),
  birthdate: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("Születési dátum kitöltése kötelező"), // TODO: contradicting with data model
  mother_name: Yup.string().required("Anyja neve kitöltése kötelező"), // TODO: contradicting with data model
  gender_id: Yup.string().nullable(),
  identity_card_number: Yup.string().nullable(),
  membership_fee_category_id: Yup.string().required("Tagdíj kategória kitöltése kötelező"),
  notes: Yup.string().nullable(),
};

export type { PersonDetailType, PersonDetailFormType, PersonDataType };
export { personValidation };
