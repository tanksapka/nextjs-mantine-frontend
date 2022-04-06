import { Group, Input, Select, Textarea } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { IconBadge, IconCalendar, IconCoin, IconHash, IconId } from "@tabler/icons";

interface SelectDataType {
  value: string;
  label: string;
}

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
  memberhip_fee_category_id: string;
  memberhip_fee_category_name: string;
  notes: string;
}

interface AddressDetailType {
  id: string;
  person_id: string;
  address_type_id: string;
  address_type_name: string;
  zip: string;
  city: string;
  address_1: string;
  address_2: string;
}

interface EmailDetailType {
  id: string;
  person_id: string;
  email_type_id: string;
  email_type_name: string;
  email: string;
  messenger: string;
  skype: string;
}

interface PhoneDetailType {
  id: string;
  person_id: string;
  phone_type_id: string;
  phone_type_name: string;
  phone_number: string;
  phone_extension: string;
  messenger: string;
  skype: string;
  viber: string;
  whatsapp: string;
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

function Person({
  personData,
  genderData,
  membershipFeeData,
}: {
  personData: PersonDataType;
  genderData: Array<SelectDataType>;
  membershipFeeData: Array<SelectDataType>;
}): JSX.Element {
  return (
    <>
      <Group>
        <Input icon={<IconHash />} placeholder="Regisztrációs szám" value={personData.person.registration_number} />
        <Input icon={<IconId />} placeholder="Tagsági szám" value={personData.person.membership_id} />
      </Group>
      <Group>
        <Input placeholder="Név" value={personData.person.person_name} />
        <Calendar placeholder="Születési dátum" value={new Date(personData.person.birthdate)} />
      </Group>
      <Group>
        <Input placeholder="Anyja neve" value={personData.person.mother_name} />
        <Select placeholder="Nem" data={genderData} value={personData.person.gender_id} />
      </Group>
      <Group>
        <Input
          icon={<IconBadge />}
          placeholder="Személyi igazolvány szám"
          value={personData.person.identity_card_number}
        />
        <Select
          icon={<IconCoin />}
          placeholder="Tagdíj kategória"
          data={membershipFeeData}
          value={personData.person.memberhip_fee_category_id}
        />
      </Group>
      <Group>
        <Textarea placeholder="Megyjegyzés" value={personData.person.notes && ""} />
      </Group>
    </>
  );
}

export default Person;
export type { SelectDataType, PersonDataType };
