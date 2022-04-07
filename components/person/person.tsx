import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { Group, TextInput, Select, Textarea } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconCalendar,
  IconCoin,
  IconHash,
  IconId,
  IconIdBadge2,
  IconNote,
  IconUser,
  IconVenus,
  IconWoman,
} from "@tabler/icons";

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

const schema = Yup.object().shape({
  // person: Yup.object().shape({
  registration_number: Yup.number(),
  membership_id: Yup.string(),
  person_name: Yup.string().required("Név kitöltése kötelező"),
  birthdate: Yup.date().required("Születési dátum kitöltése kötelező"),
  mother_name: Yup.string().required("Anyja neve kitöltése kötelező"),
  gender_id: Yup.string(),
  identity_card_number: Yup.string(),
  memberhip_fee_category_id: Yup.string().required("Tagdíj kategória kitöltése kötelező"),
  notes: Yup.string(),
  // }),
});

function Person({
  personData,
  genderData,
  membershipFeeData,
}: {
  personData: PersonDataType;
  genderData: Array<SelectDataType>;
  membershipFeeData: Array<SelectDataType>;
}): JSX.Element {
  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      registration_number: undefined,
      membership_id: undefined,
      person_name: undefined,
      birthdate: undefined,
      mother_name: undefined,
      gender_id: undefined,
      identity_card_number: undefined,
      memberhip_fee_category_id: undefined,
      notes: undefined,
    },
  });

  return (
    <>
      <Group>
        <TextInput
          icon={<IconHash />}
          label="Regisztrációs szám"
          placeholder="Regisztrációs szám..."
          title="Regisztrációs szám"
          value={personData.person.registration_number}
        />
        <TextInput
          icon={<IconIdBadge2 />}
          label="Tagsági szám"
          placeholder="Tagsági szám..."
          title="Tagsági szám"
          value={personData.person.membership_id}
        />
      </Group>
      <Group>
        <TextInput
          icon={<IconUser />}
          label="Név"
          placeholder="Név..."
          title="Név"
          value={personData.person.person_name}
        />
        <DatePicker
          icon={<IconCalendar />}
          label="Születési dátum"
          placeholder="Születési dátum..."
          title="Születési dátum"
          value={new Date(personData.person.birthdate)}
        />
      </Group>
      <Group>
        <TextInput
          icon={<IconWoman />}
          label="Anyja neve"
          placeholder="Anyja neve..."
          title="Anyja neve"
          value={personData.person.mother_name}
        />
        <Select
          icon={<IconVenus />}
          label="Nem"
          placeholder="Nem..."
          title="Nem"
          data={genderData}
          value={personData.person.gender_id}
        />
      </Group>
      <Group>
        <TextInput
          icon={<IconId />}
          label="Személyi igazolvány szám"
          placeholder="Személyi igazolvány szám..."
          title="Személyi igazolvány szám"
          value={personData.person.identity_card_number}
        />
        <Select
          icon={<IconCoin />}
          label="Tagdíj kategória"
          placeholder="Tagdíj kategória..."
          title="Tagdíj kategória"
          data={membershipFeeData}
          value={personData.person.memberhip_fee_category_id}
        />
      </Group>
      <Group>
        <Textarea
          icon={<IconNote />}
          label="Megjegyzés"
          placeholder="Megyjegyzés..."
          title="Megjegyzés"
          value={personData.person.notes && ""}
        />
      </Group>
    </>
  );
}

export default Person;
export type { SelectDataType, PersonDataType };
