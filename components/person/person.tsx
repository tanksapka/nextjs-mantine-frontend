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
  InputWrapper,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
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
  IconInfoCircle,
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
import { removeErrors } from "../../utils/util";

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
  zip: string;
  city: string;
  address_1: string;
  address_2: string;
}

interface EmailDetailType {
  id: string;
  person_id: string;
  email_type_id: string;
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
  const schema = Yup.object().shape({
    registration_number: Yup.number(),
    membership_id: Yup.string(),
    person_name: Yup.string().required("Név kitöltése kötelező"),
    birthdate: Yup.date()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .required("Születési dátum kitöltése kötelező"),
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
      .test("UniqueAddress", "Cím típusa nem ismétlődhet", (values, ctx) => {
        const extracted = values ? values.map((data) => data.address_type_id) : [];
        const uniqueData = Array.from(new Set(extracted));
        const countMap = extracted.reduce(
          (prev, current) => prev.set(current, (prev.get(current) || 0) + 1),
          new Map()
        );
        if (uniqueData.length === extracted?.length) return true;
        const errors = extracted.map((item, idx) =>
          countMap.get(item) > 1 ? ctx.createError({ path: `${ctx.path}.${idx}.address_type_id` }) : false
        );
        return errors.filter((err) => err !== false).at(-1) || true;
      }),
    emails: Yup.array()
      .of(
        Yup.object().shape({
          email_type_id: Yup.string().required("Email típus kitöltése kötelező"),
          email: Yup.string().email("Valós email címet ajd meg").required("Email kitöltése kötelező"),
          messenger: Yup.bool().default(false),
          skype: Yup.bool().default(false),
        })
      )
      .test("UniqueEmail", "Email típusa nem ismétlődhet", (values, ctx) => {
        const extracted = values ? values.map((data) => data.email_type_id) : [];
        const uniqueData = Array.from(new Set(extracted));
        const countMap = extracted.reduce(
          (prev, current) => prev.set(current, (prev.get(current) || 0) + 1),
          new Map()
        );
        if (uniqueData.length === extracted?.length) return true;
        const errors = extracted.map((item, idx) =>
          countMap.get(item) > 1 ? ctx.createError({ path: `${ctx.path}.${idx}.email_type_id` }) : false
        );
        return errors.filter((err) => err !== false).at(-1) || true;
      }),
    phones: Yup.array()
      .of(
        Yup.object().shape({
          phone_type_id: Yup.string().required("Telefonszám típus kitöltése kötelező"),
          phone_number: Yup.string().required("Telefonszám kitöltése kötelező"),
          phone_extension: Yup.string(),
          messenger: Yup.bool().default(false),
          skype: Yup.bool().default(false),
          viber: Yup.bool().default(false),
          whatsapp: Yup.bool().default(false),
        })
      )
      .test("UniquePhone", "Telefonszám típusa nem ismétlődhet", (values, ctx) => {
        const extracted = values ? values.map((data) => data.phone_type_id) : [];
        const uniqueData = Array.from(new Set(extracted));
        const countMap = extracted.reduce(
          (prev, current) => prev.set(current, (prev.get(current) || 0) + 1),
          new Map()
        );
        if (uniqueData.length === extracted?.length) return true;
        const errors = extracted.map((item, idx) =>
          countMap.get(item) > 1 ? ctx.createError({ path: `${ctx.path}.${idx}.phone_type_id` }) : false
        );
        return errors.filter((err) => err !== false).at(-1) || true;
      }),
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
    email: "",
    messenger: false,
    skype: false,
  };

  const defaultPhoneData: PhoneFormType = {
    id: "",
    person_id: personData.person.id,
    phone_type_id: "",
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
                removeErrors(`addresses.${idx}`, form);
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
          icon={<IconDirections />}
          label="Cím típusa"
          name="address_type_id"
          placeholder="Cím típusa..."
          required
          title="Cím típusa"
          {...form.getListInputProps("addresses", idx, "address_type_id")}
        />
        <InputWrapper id="zip" label="Irányítószám" required title="Irányítószám">
          <TextInput
            icon={<IconMailbox />}
            id="zip"
            name="zip"
            placeholder="Irányítószám..."
            {...form.getListInputProps("addresses", idx, "zip")}
          />
        </InputWrapper>
        <InputWrapper id="city" label="Helység" required title="Helység">
          <TextInput
            icon={<IconBuildingCommunity />}
            id="city"
            name="city"
            placeholder="Helység..."
            {...form.getListInputProps("addresses", idx, "city")}
          />
        </InputWrapper>
      </Group>
      <Group grow mb="lg" align="baseline">
        <InputWrapper id="address_1" label="Cím 1" required title="Cím 1">
          <TextInput
            icon={<IconHome />}
            id="address_1"
            name="address_1"
            placeholder="Cím 1..."
            {...form.getListInputProps("addresses", idx, "address_1")}
          />
        </InputWrapper>
        <InputWrapper id="address_2" label="Cím 2" title="Cím 2">
          <TextInput
            icon={<IconHome />}
            id="address_2"
            name="address_2"
            placeholder="Cím 2..."
            {...form.getListInputProps("addresses", idx, "address_2")}
          />
        </InputWrapper>
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
              onClick={() => {
                form.removeListItem("emails", idx);
                removeErrors(`emails.${idx}`, form);
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </>
        }
      />
      <Group grow mb="lg" align="baseline">
        <Select
          data={emailTypeData}
          icon={<IconMail />}
          label="Email cím típusa"
          name="email_type_id"
          placeholder="Email cím típusa..."
          required
          title="Email cím típusa"
          {...form.getListInputProps("emails", idx, "email_type_id")}
        />
        <InputWrapper id="email" label="Email" required title="Email">
          <TextInput
            icon={<IconAt />}
            id="email"
            name="email"
            placeholder="Email..."
            type="email"
            {...form.getListInputProps("emails", idx, "email")}
          />
        </InputWrapper>
      </Group>
      <Group mb="lg" align="baseline">
        <Checkbox
          label="Messenger"
          name="messenger"
          title="Messenger"
          {...form.getListInputProps("emails", idx, "messenger", { type: "checkbox" })}
        />
        <Checkbox
          label="Skype"
          name="skype"
          title="Skype"
          {...form.getListInputProps("emails", idx, "skype", { type: "checkbox" })}
        />
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
              onClick={() => {
                form.removeListItem("phones", idx);
                removeErrors(`phones.${idx}`, form);
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </>
        }
      />
      <Group grow mb="lg" align="baseline">
        <Select
          data={phoneTypeData}
          icon={<IconDeviceMobile />}
          label="Telefonszám típus"
          name="phone_type_id"
          placeholder="Telefonszám típusa..."
          required
          title="Telefonszám típus"
          {...form.getListInputProps("phones", idx, "phone_type_id")}
        />
        <InputWrapper id="phone_number" label="Telefonszám" required title="Telefonszám">
          <TextInput
            icon={<IconPhone />}
            id="phone_number"
            name="phone_number"
            placeholder="Telefonszám..."
            {...form.getListInputProps("phones", idx, "phone_number")}
          />
        </InputWrapper>
        <InputWrapper label="Mellék" title="Mellék">
          <TextInput
            icon={<IconNumbers />}
            id="phone_extension"
            name="phone_extension"
            placeholder="Mellék..."
            {...form.getListInputProps("phones", idx, "phone_extension")}
          />
        </InputWrapper>
      </Group>
      <Group mb="lg" align="baseline">
        <Checkbox
          label="Messenger"
          name="messenger"
          title="Messenger"
          {...form.getListInputProps("phones", idx, "messenger", { type: "checkbox" })}
        />
        <Checkbox
          label="Skype"
          name="skype"
          title="Skype"
          {...form.getListInputProps("phones", idx, "skype", { type: "checkbox" })}
        />
        <Checkbox
          label="Viber"
          name="viber"
          title="Viber"
          {...form.getListInputProps("phones", idx, "viber", { type: "checkbox" })}
        />
        <Checkbox
          label="Whatsapp"
          name="whatsapp"
          title="Whatsapp"
          {...form.getListInputProps("phones", idx, "whatsapp", { type: "checkbox" })}
        />
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
          <Group grow mb="lg" align="baseline">
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
          <Group grow mb="lg" align="baseline">
            <InputWrapper id="person_name" label="Név" required title="Név">
              <TextInput
                icon={<IconUser />}
                id="person_name"
                name="person_name"
                placeholder="Név..."
                {...form.getInputProps("person_name")}
              />
            </InputWrapper>
            <InputWrapper id="birthdate" label="Születési dátum" required title="Születési dátum">
              <DatePicker
                allowFreeInput
                icon={<IconCake />}
                id="birthdate"
                inputFormat="YYYY.MM.DD"
                labelFormat="YYYY MMMM"
                locale="hu"
                name="birthdate"
                placeholder="Születési dátum..."
                {...form.getInputProps("birthdate")}
              />
            </InputWrapper>
          </Group>
          <Group grow mb="lg" align="baseline">
            <InputWrapper id="mother_name" label="Anyja neve" required title="Anyja neve">
              <TextInput
                icon={<IconWoman />}
                id="mother_name"
                name="mother_name"
                placeholder="Anyja neve..."
                {...form.getInputProps("mother_name")}
              />
            </InputWrapper>
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
          <Group grow mb="lg" align="baseline">
            <InputWrapper id="identity_card_number" label="Személyi igazolvány szám" title="Személyi igazolvány szám">
              <TextInput
                icon={<IconId />}
                id="identity_card_number"
                name="identity_card_number"
                placeholder="Személyi igazolvány szám..."
                {...form.getInputProps("identity_card_number")}
              />
            </InputWrapper>
            <Select
              icon={<IconCoin />}
              label="Tagdíj kategória"
              name="membership_fee_category_id"
              placeholder="Tagdíj kategória..."
              required
              title="Tagdíj kategória"
              data={membershipFeeData}
              {...form.getInputProps("membership_fee_category_id")}
            />
          </Group>
          <Group grow mb="lg" align="baseline">
            <InputWrapper id="notes" label="Megjegyzés" title="Megjegyzés">
              <Textarea
                autosize
                icon={<IconNote />}
                id="notes"
                maxRows={10}
                minRows={3}
                name="notes"
                placeholder="Megyjegyzés..."
                {...form.getInputProps("notes")}
              />
            </InputWrapper>
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
            <ActionIcon
              color="blue"
              title="Új cím hozzáadása"
              mb={"1.5rem"}
              disabled={form.values.addresses.length === addressTypeData.length ? true : false}
              onClick={() => form.addListItem("addresses", defaultAddressData)}
            >
              <IconPlus />
            </ActionIcon>
          </Group>
          <Group align="flex-start" style={{ gap: "0.5rem" }} mb="lg">
            <IconInfoCircle style={{ color: "#1c7ed6" }} />
            <Text color="blue" size="sm">
              Cím típusa nem ismétlődhet!
            </Text>
          </Group>
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
              disabled={form.values.emails.length === emailTypeData.length ? true : false}
              onClick={() => form.addListItem("emails", defaultEmailData)}
            >
              <IconPlus />
            </ActionIcon>
          </Group>
          <Group align="flex-start" style={{ gap: "0.5rem" }} mb="lg">
            <IconInfoCircle style={{ color: "#1c7ed6" }} />
            <Text color="blue" size="sm">
              Email típusa nem ismétlődhet!
            </Text>
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
              disabled={form.values.phones.length === phoneTypeData.length ? true : false}
              onClick={() => form.addListItem("phones", defaultPhoneData)}
            >
              <IconPlus />
            </ActionIcon>
          </Group>
          <Group align="flex-start" style={{ gap: "0.5rem" }} mb="lg">
            <IconInfoCircle style={{ color: "#1c7ed6" }} />
            <Text color="blue" size="sm">
              Telefonszám típusa nem ismétlődhet!
            </Text>
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
