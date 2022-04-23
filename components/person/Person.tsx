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
  Text,
  ActionIcon,
  InputWrapper,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconCake,
  IconCoin,
  IconGenderBigender,
  IconHash,
  IconId,
  IconIdBadge2,
  IconInfoCircle,
  IconNote,
  IconPlus,
  IconUser,
  IconWoman,
} from "@tabler/icons";
import { convertToBool } from "../../utils/util";
import type { SelectDataType } from "../../types/general";
import { PersonDataType, PersonDetailFormType, personValidation } from "../../types/person-detail";
import { addressValidation, defaultAddressData } from "../../types/address-detail";
import { emailValidation, defaultEmailData } from "../../types/email-detail";
import { phoneValidation, defaultPhoneData } from "../../types/phone-detail";
import { Address } from "../address/Address";
import { Email } from "../email/Email";
import { Phone } from "../phone/Phone";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { OrganizationDetailFormType } from "../../types/organization-detail";

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
    ...personValidation,
    address: addressValidation,
    email: emailValidation,
    phone: phoneValidation,
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
      address: formList(personData.address.map((data) => ({ ...data, address_2: data.address_2 || undefined }))),
      email: formList(
        personData.email.map((data) => ({
          ...data,
          messenger: convertToBool(data.messenger),
          skype: convertToBool(data.skype),
        }))
      ),
      phone: formList(
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

  const addressFields = form.values.address.map((_, idx) => (
    <Address
      key={idx}
      idx={idx}
      form={form as UseFormReturnType<PersonDetailFormType | OrganizationDetailFormType>}
      addressTypeData={addressTypeData}
    />
  ));

  const emailFields = form.values.email.map((_, idx) => (
    <Email
      key={idx}
      idx={idx}
      form={form as UseFormReturnType<PersonDetailFormType | OrganizationDetailFormType>}
      emailTypeData={emailTypeData}
    />
  ));

  const phoneFields = form.values.phone.map((_, idx) => (
    <Phone
      key={idx}
      idx={idx}
      form={form as UseFormReturnType<PersonDetailFormType | OrganizationDetailFormType>}
      phoneTypeData={phoneTypeData}
    />
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
              icon={<IconGenderBigender />}
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
              disabled={form.values.address.length === addressTypeData.length ? true : false}
              onClick={() => form.addListItem("address", defaultAddressData(personData.person.id))}
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
              disabled={form.values.email.length === emailTypeData.length ? true : false}
              onClick={() => form.addListItem("email", defaultEmailData(personData.person.id))}
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
              disabled={form.values.phone.length === phoneTypeData.length ? true : false}
              onClick={() => form.addListItem("phone", defaultPhoneData(personData.person.id))}
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

export { Person };
export type { PersonDataType };
