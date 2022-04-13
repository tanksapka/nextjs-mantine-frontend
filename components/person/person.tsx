import * as Yup from "yup";
import "dayjs/locale/hu";
import { formList, useForm, yupResolver } from "@mantine/form";
import {
  Group,
  TextInput,
  Select,
  Textarea,
  Container,
  Button,
  Title,
  Paper,
  Checkbox,
  Divider,
  Text,
  ActionIcon,
  Menu,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconAlertCircle,
  IconAt,
  IconBuildingCommunity,
  IconCake,
  IconCoin,
  IconDeviceMobile,
  IconDirections,
  IconHash,
  IconHome,
  IconId,
  IconIdBadge2,
  IconMail,
  IconMailbox,
  IconNote,
  IconNumbers,
  IconPhone,
  IconPlus,
  IconTrash,
  IconUser,
  IconVenus,
  IconWoman,
} from "@tabler/icons";
import { useState } from "react";

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
  // address_type_name: string;
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

interface EmailFormType extends Omit<EmailDetailType, "messenger" | "skype"> {
  messenger: boolean;
  skype: boolean;
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

interface PhoneFormType extends Omit<PhoneDetailType, "messenger" | "skype" | "viber" | "whatsapp"> {
  messenger: boolean;
  skype: boolean;
  viber: boolean;
  whatsapp: boolean;
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

function convertToBool(value: string): boolean {
  return value === "Y" ? true : false;
}

function Person({
  personData,
  genderData,
  membershipFeeData,
  addressTypeData,
  emailTypeData,
  phoneTypeData,
}: {
  personData: PersonDataType;
  genderData: Array<SelectDataType>;
  membershipFeeData: Array<SelectDataType>;
  addressTypeData: Array<SelectDataType>;
  emailTypeData: Array<SelectDataType>;
  phoneTypeData: Array<SelectDataType>;
}): JSX.Element {
  const [availableAddresses, setAvailableAddresses] = useState(() => getDefaultAddresses());

  Yup.addMethod(Yup.array, "unique", function (message, mapper = (a: AddressDetailType) => a) {
    return this.test("unique", message, function (list) {
      return typeof list === "undefined" ? false : list.length === new Set(list.map(mapper)).size;
    });
  });

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
    addresses: Yup.array()
      .of(
        Yup.object().shape({
          address_type_id: Yup.string().required("Cím típus kitöltése kötelező"),
          zip: Yup.string().required("Irányítószám kitöltése kötelező"),
          city: Yup.string().required("Helység kitöltése kötelező"),
          address_1: Yup.string().required("Cím kitöltése kötelező"),
          address_2: Yup.string(),
        })
      )
      .unique("Cím típusa nem ismétlődhet!", (a: AddressDetailType) => a.address_type_id),
    emails: Yup.array().of(
      Yup.object().shape({
        email_type_id: Yup.string().required("Email típus kitöltése kötelező"),
        email: Yup.string().email("Valós email címet ajd meg").required("Email kitöltése kötelező"),
        messenger: Yup.bool().default(false),
        skype: Yup.bool().default(false),
      })
    ),
    phones: Yup.array().of(
      Yup.object().shape({
        phone_type_id: Yup.string().required("Telefonszám típus kitöltése kötelező"),
        phone_number: Yup.string().required("Telefonszám kitöltése kötelező"),
        phone_extension: Yup.string(),
        messenger: Yup.bool().default(false),
        skype: Yup.bool().default(false),
        viber: Yup.bool().default(false),
        whatsapp: Yup.bool().default(false),
      })
    ),
  });

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
      addresses: formList(personData.address.map((data) => ({ ...data, address_2: data.address_2 || undefined }))),
      emails: formList(
        personData.email.map((data) => ({
          ...data,
          messenger: convertToBool(data.messenger),
          skype: convertToBool(data.skype),
        }))
      ),
      phones: formList(
        personData.phone.map((data) => ({
          ...data,
          phone_extension: data.phone_extension || undefined,
          messenger: convertToBool(data.messenger),
          skype: convertToBool(data.skype),
          viber: convertToBool(data.viber),
          whatsapp: convertToBool(data.whatsapp),
        }))
      ),
    },
  });

  function getDefaultAddresses(): Array<SelectDataType> {
    return addressTypeData
      .filter((address_id) => !personData.address.map((value) => value.address_type_id).includes(address_id.value))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  const defaultAddressData: AddressDetailType = {
    id: "",
    person_id: personData.person.id,
    address_type_id: "",
    zip: "",
    city: "",
    address_1: "",
    address_2: "",
  };

  const defaultEmailData: EmailFormType = {
    id: "",
    person_id: personData.person.id,
    email_type_id: "",
    email_type_name: "",
    email: "",
    messenger: false,
    skype: false,
  };

  const defaultPhoneData: PhoneFormType = {
    id: "",
    person_id: personData.person.id,
    phone_type_id: "",
    phone_type_name: "",
    phone_number: "",
    phone_extension: "",
    messenger: false,
    skype: false,
    viber: false,
    whatsapp: false,
  };

  const addressFields = form.values.addresses.map((_, idx) => (
    <div key={idx}>
      <Divider
        mb="xs"
        label={
          <>
            <IconHome />
            <Text ml="xs">Cím #{idx + 1}</Text>
            <ActionIcon
              color="red"
              ml="xs"
              title="Cím törlése"
              onClick={() => {
                form.removeListItem("addresses", idx);
                setAvailableAddresses((oldAddresses) =>
                  oldAddresses.map((data) => data.value).includes(_.address_type_id)
                    ? getDefaultAddresses()
                    : [...oldAddresses, ...addressTypeData.filter((item) => item.value === _.address_type_id)].sort(
                        (a, b) => a.label.localeCompare(b.label)
                      )
                );
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </>
        }
      />
      <Group grow mb="lg" align="baseline">
        <Select
          data={addressTypeData.sort((a, b) => a.label.localeCompare(b.label))}
          error={form.errors.addresses && "Ismétlődő cím típus"}
          icon={<IconDirections />}
          label="Cím típusa"
          name="address_type_id"
          placeholder="Cím típusa..."
          required
          title="Cím típusa"
          {...form.getListInputProps("addresses", idx, "address_type_id")}
        ></Select>
        <TextInput
          icon={<IconMailbox />}
          label="Irányítószám"
          name="zip"
          placeholder="Irányítószám..."
          required
          title="Irányítószám"
          {...form.getListInputProps("addresses", idx, "zip")}
        ></TextInput>
        <TextInput
          icon={<IconBuildingCommunity />}
          label="Helység"
          name="city"
          placeholder="Helység..."
          required
          title="Helység"
          {...form.getListInputProps("addresses", idx, "city")}
        ></TextInput>
      </Group>
      <Group grow mb="lg">
        <TextInput
          icon={<IconHome />}
          label="Cím 1"
          name="address_1"
          placeholder="Cím 1..."
          required
          title="Cím 1"
          {...form.getListInputProps("addresses", idx, "address_1")}
        ></TextInput>
        <TextInput
          icon={<IconHome />}
          label="Cím 2"
          name="address_2"
          placeholder="Cím 2..."
          title="Cím 2"
          {...form.getListInputProps("addresses", idx, "address_2")}
        ></TextInput>
      </Group>
    </div>
  ));

  const emailFields = form.values.emails.map((_, idx) => (
    <div key={idx}>
      <Divider
        mb="xs"
        label={
          <>
            <IconMail />
            <Text ml="xs">Email #{idx + 1}</Text>
            <ActionIcon
              color="red"
              ml="xs"
              title="Email cím törlése"
              onClick={() => form.removeListItem("emails", idx)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </>
        }
      />
      <Group grow mb="lg">
        <Select
          data={emailTypeData}
          icon={<IconMail />}
          label="Email cím típusa"
          name="email_type_id"
          placeholder="Email cím típusa..."
          required
          title="Email cím típusa"
          {...form.getListInputProps("emails", idx, "email_type_id")}
        ></Select>
        <TextInput
          icon={<IconAt />}
          label="Email"
          name="email"
          placeholder="Email..."
          required
          title="Email"
          type="email"
          {...form.getListInputProps("emails", idx, "email")}
        ></TextInput>
      </Group>
      <Group mb="lg">
        <Checkbox
          label="Messenger"
          name="messenger"
          title="Messenger"
          {...form.getListInputProps("emails", idx, "messenger", { type: "checkbox" })}
        ></Checkbox>
        <Checkbox
          label="Skype"
          name="skype"
          title="Skype"
          {...form.getListInputProps("emails", idx, "skype", { type: "checkbox" })}
        ></Checkbox>
      </Group>
    </div>
  ));

  const phoneFields = form.values.phones.map((_, idx) => (
    <div key={idx}>
      <Divider
        mb="xs"
        label={
          <>
            <IconPhone />
            <Text ml="xs">Telefonszám #{idx + 1}</Text>
            <ActionIcon
              color="red"
              ml="xs"
              title="Telefonszám törlése"
              onClick={() => form.removeListItem("phones", idx)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </>
        }
      />
      <Group grow mb="lg">
        <Select
          data={phoneTypeData}
          icon={<IconDeviceMobile />}
          label="Telefonszám típus"
          name="phone_type_id"
          placeholder="Telefonszám típusa..."
          required
          title="Telefonszám típus"
          {...form.getListInputProps("phones", idx, "phone_type_id")}
        ></Select>
        <TextInput
          icon={<IconPhone />}
          label="Telefonszám"
          name="phone_number"
          placeholder="Telefonszám..."
          required
          title="Telefonszám"
          {...form.getListInputProps("phones", idx, "phone_number")}
        ></TextInput>
        <TextInput
          icon={<IconNumbers />}
          label="Mellék"
          name="phone_extension"
          placeholder="Mellék..."
          title="Mellék"
          {...form.getListInputProps("phones", idx, "phone_extension")}
        ></TextInput>
      </Group>
      <Group mb="lg">
        <Checkbox
          label="Messenger"
          name="messenger"
          title="Messenger"
          {...form.getListInputProps("phones", idx, "messenger", { type: "checkbox" })}
        ></Checkbox>
        <Checkbox
          label="Skype"
          name="skype"
          title="Skype"
          {...form.getListInputProps("phones", idx, "skype", { type: "checkbox" })}
        ></Checkbox>
        <Checkbox
          label="Viber"
          name="viber"
          title="Viber"
          {...form.getListInputProps("phones", idx, "viber", { type: "checkbox" })}
        ></Checkbox>
        <Checkbox
          label="Whatsapp"
          name="whatsapp"
          title="Whatsapp"
          {...form.getListInputProps("phones", idx, "whatsapp", { type: "checkbox" })}
        ></Checkbox>
      </Group>
    </div>
  ));

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Container size="sm" my="xl">
        <Title order={1} mb="xl">
          Személyes adatok
        </Title>
        <Paper shadow="xs" p="md">
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
        </Paper>
      </Container>
      <Container size="sm" my="xl">
        <Title order={1} mb="xl">
          Elérhetőségek
        </Title>
        <Paper shadow="xs" p="md" mb="xl">
          <Group style={{ justifyContent: "space-between" }}>
            <Title order={2} mb="xl">
              Címek
            </Title>
            <Menu
              control={
                <ActionIcon
                  color="blue"
                  title="Új cím hozzáadása"
                  mb={"1.5rem"}
                  disabled={availableAddresses.length > 0 ? false : true}
                >
                  <IconPlus />
                </ActionIcon>
              }
            >
              {availableAddresses.map((value) => (
                <Menu.Item
                  key={value.value}
                  onClick={() => {
                    form.addListItem("addresses", {
                      ...defaultAddressData,
                      address_type_id: value.value,
                    });
                    setAvailableAddresses((oldAddresses) =>
                      oldAddresses
                        .filter((address) => address.value !== value.value)
                        .sort((a, b) => a.label.localeCompare(b.label))
                    );
                  }}
                >
                  {value.label}
                </Menu.Item>
              ))}
            </Menu>
          </Group>
          {form.errors.addresses && (
            <Group align="flex-start">
              <IconAlertCircle color="red" />
              <Text color="red" mb="lg" align="justify">
                {form.errors.addresses}
              </Text>
            </Group>
          )}
          {addressFields}
        </Paper>
        <Paper shadow="xs" p="md" mb="xl">
          <Group style={{ justifyContent: "space-between" }}>
            <Title order={2} mb="xl">
              Email címek
            </Title>
            <ActionIcon
              color="blue"
              title="Új email cím hozzáadása"
              mb={"1.5rem"}
              onClick={() => form.addListItem("emails", defaultEmailData)}
            >
              <IconPlus />
            </ActionIcon>
          </Group>
          {emailFields}
        </Paper>
        <Paper shadow="xs" p="md" mb="xl">
          <Group style={{ justifyContent: "space-between" }}>
            <Title order={2} mb="xl">
              Telefonszámok
            </Title>
            <ActionIcon
              color="blue"
              title="Új telefonszám hozzáadása"
              mb={"1.5rem"}
              onClick={() => form.addListItem("phones", defaultPhoneData)}
            >
              <IconPlus />
            </ActionIcon>
          </Group>
          {phoneFields}
        </Paper>
      </Container>
      <Group position="right" mt="xl">
        <Button type="submit">Mentés</Button>
      </Group>
    </form>
  );
}

export default Person;
export type { SelectDataType, PersonDataType };
