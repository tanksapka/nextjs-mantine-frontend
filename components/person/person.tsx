import * as Yup from "yup";
import "dayjs/locale/hu";
import { useForm, yupResolver } from "@mantine/form";
import { Group, TextInput, Select, Textarea, Container, Button, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconCake,
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
  membership_fee_category_id: string;
  membership_fee_category_name: string;
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
  registration_number: Yup.number(),
  membership_id: Yup.string(),
  person_name: Yup.string().required("Név kitöltése kötelező"),
  birthdate: Yup.date().required("Születési dátum kitöltése kötelező"),
  mother_name: Yup.string().required("Anyja neve kitöltése kötelező"),
  gender_id: Yup.string(),
  identity_card_number: Yup.string(),
  membership_fee_category_id: Yup.string().required("Tagdíj kategória kitöltése kötelező"),
  notes: Yup.string(),
  address_type_id: Yup.string().required("Cím típus kitöltése kötelező"),
  zip: Yup.string().required("Irányítószám kitöltése kötelező"),
  city: Yup.string().required("Helység kitöltése kötelező"),
  address_1: Yup.string().required("Cím kitöltése kötelező"),
  address_2: Yup.string(),
});

function Person({
  personData,
  genderData,
  membershipFeeData,
  addressTypeData,
}: {
  personData: PersonDataType;
  genderData: Array<SelectDataType>;
  membershipFeeData: Array<SelectDataType>;
  addressTypeData: Array<SelectDataType>;
}): JSX.Element {
  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      registration_number: personData.person.registration_number,
      membership_id: personData.person.membership_id,
      person_name: personData.person.person_name,
      birthdate: new Date(personData.person.birthdate),
      mother_name: personData.person.mother_name,
      gender_id: personData.person.gender_id,
      identity_card_number: personData.person.identity_card_number,
      membership_fee_category_id: personData.person.membership_fee_category_id,
      notes: personData.person.notes || undefined,
      address_type_id: personData.address[0].address_type_id,
      zip: personData.address[0].zip,
      city: personData.address[0].city,
      address_1: personData.address[0].address_1,
      address_2: personData.address[0].address_2 || undefined,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Container size="sm" my="xl">
        <Title order={1} mb="xl">
          Személyes adatok
        </Title>
        <Group grow mb="lg">
          <TextInput
            icon={<IconHash />}
            label="Regisztrációs szám"
            name="registration_number"
            placeholder="Regisztrációs szám..."
            title="Regisztrációs szám"
            readOnly
            {...form.getInputProps("registration_number")}
          />
          <TextInput
            icon={<IconIdBadge2 />}
            label="Tagsági szám"
            name="membership_id"
            placeholder="Tagsági szám..."
            readOnly
            title="Tagsági szám"
            {...form.getInputProps("membership_id")}
          />
        </Group>
        <Group grow mb="lg">
          <TextInput
            icon={<IconUser />}
            label="Név"
            name="person_name"
            placeholder="Név..."
            required
            title="Név"
            {...form.getInputProps("person_name")}
          />
          <DatePicker
            allowFreeInput
            icon={<IconCake />}
            inputFormat="YYYY.MM.DD"
            label="Születési dátum"
            labelFormat="YYYY MMMM"
            locale="hu"
            name="birthdate"
            placeholder="Születési dátum..."
            required
            title="Születési dátum"
            {...form.getInputProps("birthdate")}
          />
        </Group>
        <Group grow mb="lg">
          <TextInput
            icon={<IconWoman />}
            label="Anyja neve"
            name="mother_name"
            placeholder="Anyja neve..."
            required
            title="Anyja neve"
            {...form.getInputProps("mother_name")}
          />
          <Select
            allowDeselect
            icon={<IconVenus />}
            label="Nem"
            name="gender_id"
            placeholder="Nem..."
            title="Nem"
            data={genderData}
            {...form.getInputProps("gender_id")}
          />
        </Group>
        <Group grow mb="lg">
          <TextInput
            icon={<IconId />}
            label="Személyi igazolvány szám"
            name="identity_card_number"
            placeholder="Személyi igazolvány szám..."
            title="Személyi igazolvány szám"
            {...form.getInputProps("identity_card_number")}
          />
          <Select
            icon={<IconCoin />}
            label="Tagdíj kategória"
            name="membership_fee_category_id"
            placeholder="Tagdíj kategória..."
            title="Tagdíj kategória"
            data={membershipFeeData}
            {...form.getInputProps("membership_fee_category_id")}
          />
        </Group>
        <Group grow mb="lg">
          <Textarea
            autosize
            icon={<IconNote />}
            label="Megjegyzés"
            maxRows={10}
            minRows={3}
            name="notes"
            placeholder="Megyjegyzés..."
            title="Megjegyzés"
            {...form.getInputProps("notes")}
          />
        </Group>
      </Container>
      <Container size="sm" my="xl">
        <Title order={1} mb="xl">
          Elérhetőségek
        </Title>
        <Group grow mb="lg">
          <Select
            data={addressTypeData}
            label="Cím típusa"
            name="address_type_id"
            required
            title="Cím típusa"
            {...form.getInputProps("address_type_id")}
          ></Select>
          <TextInput
            label="Irányítószám"
            name="zip"
            placeholder="Irányítószám..."
            required
            title="Irányítószám"
            {...form.getInputProps("zip")}
          ></TextInput>
          <TextInput
            label="Helység"
            name="city"
            placeholder="Helység..."
            required
            title="Helység"
            {...form.getInputProps("city")}
          ></TextInput>
        </Group>
        <Group grow mb="lg">
          <TextInput
            label="Cím 1"
            name="address_1"
            placeholder="Cím 1..."
            required
            title="Cím 1"
            {...form.getInputProps("address_1")}
          ></TextInput>
          <TextInput
            label="Cím 2"
            name="address_2"
            placeholder="Cím 2..."
            title="Cím 2"
            {...form.getInputProps("address_2")}
          ></TextInput>
        </Group>
      </Container>
      <Group position="right" mt="lg">
        <Button type="submit">Mentés</Button>
      </Group>
    </form>
  );
}

export default Person;
export type { SelectDataType, PersonDataType };
