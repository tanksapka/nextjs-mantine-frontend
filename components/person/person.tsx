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
import { convertToBool, removeErrors } from "../../utils/util";
import type { SelectDataType } from "../../types/general";
import { PersonDetailType, personValidation } from "../../types/person-detail";
import { AddressDetailType, addressValidation, defaultAddressData } from "../../types/address-detail";
import { EmailDetailType, emailValidation, defaultEmailData } from "../../types/email-detail";
import { PhoneDetailType, phoneValidation, defaultPhoneData } from "../../types/phone-detail";
import { Address } from "../address/Address";

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
    <Address key={idx} idx={idx} form={form} addressTypeData={addressTypeData} />
  ));

  const emailFields = form.values.email.map((_, idx) => (
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
                form.removeListItem("email", idx);
                removeErrors(`email.${idx}`, form);
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
          {...form.getListInputProps("email", idx, "email_type_id")}
        />
        <InputWrapper id="email" label="Email" required title="Email">
          <TextInput
            icon={<IconAt />}
            id="email"
            name="email"
            placeholder="Email..."
            type="email"
            {...form.getListInputProps("email", idx, "email")}
          />
        </InputWrapper>
      </Group>
      <Group mb="lg" align="baseline">
        <Checkbox
          label="Messenger"
          name="messenger"
          title="Messenger"
          {...form.getListInputProps("email", idx, "messenger", { type: "checkbox" })}
        />
        <Checkbox
          label="Skype"
          name="skype"
          title="Skype"
          {...form.getListInputProps("email", idx, "skype", { type: "checkbox" })}
        />
      </Group>
    </div>
  ));

  const phoneFields = form.values.phone.map((_, idx) => (
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
                form.removeListItem("phone", idx);
                removeErrors(`phone.${idx}`, form);
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
          {...form.getListInputProps("phone", idx, "phone_type_id")}
        />
        <InputWrapper id="phone_number" label="Telefonszám" required title="Telefonszám">
          <TextInput
            icon={<IconPhone />}
            id="phone_number"
            name="phone_number"
            placeholder="Telefonszám..."
            {...form.getListInputProps("phone", idx, "phone_number")}
          />
        </InputWrapper>
        <InputWrapper label="Mellék" title="Mellék">
          <TextInput
            icon={<IconNumbers />}
            id="phone_extension"
            name="phone_extension"
            placeholder="Mellék..."
            {...form.getListInputProps("phone", idx, "phone_extension")}
          />
        </InputWrapper>
      </Group>
      <Group mb="lg" align="baseline">
        <Checkbox
          label="Messenger"
          name="messenger"
          title="Messenger"
          {...form.getListInputProps("phone", idx, "messenger", { type: "checkbox" })}
        />
        <Checkbox
          label="Skype"
          name="skype"
          title="Skype"
          {...form.getListInputProps("phone", idx, "skype", { type: "checkbox" })}
        />
        <Checkbox
          label="Viber"
          name="viber"
          title="Viber"
          {...form.getListInputProps("phone", idx, "viber", { type: "checkbox" })}
        />
        <Checkbox
          label="Whatsapp"
          name="whatsapp"
          title="Whatsapp"
          {...form.getListInputProps("phone", idx, "whatsapp", { type: "checkbox" })}
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

export default Person;
export type { SelectDataType, PersonDataType };
