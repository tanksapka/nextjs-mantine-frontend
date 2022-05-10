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
  InputWrapper,
  Checkbox,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconBuilding,
  IconCake,
  IconCalendarEvent,
  IconCoin,
  IconGenderBigender,
  IconHash,
  IconId,
  IconIdBadge2,
  IconNote,
  IconUser,
  IconWoman,
} from "@tabler/icons";
import { convertToBool } from "../../utils/util";
import { PersonDataType, PersonDetailFormType, personValidation } from "../../types/person-detail";
import { addressValidation } from "../../types/address-detail";
import { emailValidation } from "../../types/email-detail";
import { phoneValidation } from "../../types/phone-detail";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { OrganizationDetailFormType } from "../../types/organization-detail";
import { ContactInfo } from "../contact-info/ContactInfo";

function Person({ personData }: { personData: PersonDataType }): JSX.Element {
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
      membership: formList(
        personData.membership.map((data) => ({
          ...data,
          active_flag: convertToBool(data.active_flag),
          event_date: data.event_date ? new Date(data.event_date) : undefined,
        }))
      ),
    },
  });

  const membershipComponents = form.values.membership.map((data, idx) => (
    <>
      <Group grow mb="lg" align="baseline" key={data.id}>
        <TextInput
          icon={<IconBuilding />}
          label="Alapszervezet neve"
          name="organization_name"
          placeholder="Alapszervezet neve..."
          title="Alapszervezet neve"
          readOnly
          {...form.getListInputProps("membership", idx, "organization_name")}
        />
        <InputWrapper id="event_date" label="Státusz dátuma" required title="Státusz dátuma">
          <DatePicker
            // allowFreeInput
            icon={<IconCalendarEvent />}
            id="event_date"
            inputFormat="YYYY.MM.DD"
            labelFormat="YYYY MMMM"
            locale="hu"
            name="event_date"
            placeholder="Státusz dátuma..."
            disabled
            {...form.getListInputProps("membership", idx, "event_date")}
          />
        </InputWrapper>
      </Group>
      <Group grow mb="lg" align="baseline">
        <Checkbox
          style={{ alignSelf: "flex-end" }}
          defaultChecked
          label="Aktív tag?"
          name="active_flag"
          readOnly
          required
          title="Aktív tag?"
          {...form.getListInputProps("membership", idx, "active_flag")}
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
            {...form.getListInputProps("membership", idx, "notes")}
          />
        </InputWrapper>
      </Group>
    </>
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
              data={personData.gender_type}
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
              data={personData.membership_fee_type}
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
      <ContactInfo
        entityId={personData.person.id}
        entityType="person"
        form={form as UseFormReturnType<PersonDetailFormType | OrganizationDetailFormType>}
        addressTypeData={personData.address_type}
        emailTypeData={personData.email_type}
        phoneTypeData={personData.phone_type}
      />
      <Container size="sm" my="xl">
        <Title order={1} mb="xl">
          Tagsági adatok
        </Title>
        <Paper shadow="xs" p="md">
          {membershipComponents}
        </Paper>
      </Container>
      <Group position="right" mt="xl">
        <Button type="submit">Mentés</Button>
      </Group>
    </form>
  );
}

export { Person };
