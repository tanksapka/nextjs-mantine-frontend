import * as Yup from "yup";
import "dayjs/locale/hu";
import { useForm, UseFormReturnType, yupResolver } from "@mantine/form";
import { Group, TextInput, Select, Textarea, Container, Button, Title, Paper, Input, Checkbox } from "@mantine/core";
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
    validate: yupResolver(schema),
    initialValues: {
      registration_number: personData.person.registration_number,
      membership_id: personData.person.membership_id,
      person_name: personData.person.person_name,
      birthdate: personData.person.birthdate ? new Date(personData.person.birthdate) : undefined,
      mother_name: personData.person.mother_name,
      gender_id: personData.person.gender_id,
      identity_card_number: personData.person.identity_card_number,
      membership_fee_category_id: personData.person.membership_fee_category_id,
      notes: personData.person.notes || undefined,
      address: personData.address.map((data) => ({ ...data, address_2: data.address_2 || undefined })),
      email: personData.email.map((data) => ({
        ...data,
        messenger: convertToBool(data.messenger),
        skype: convertToBool(data.skype),
      })),
      phone: personData.phone.map((data) => ({
        ...data,
        phone_extension: data.phone_extension || undefined,
        messenger: convertToBool(data.messenger),
        skype: convertToBool(data.skype),
        viber: convertToBool(data.viber),
        whatsapp: convertToBool(data.whatsapp),
      })),
      membership: personData.membership.map((data) => ({
        ...data,
        active_flag: convertToBool(data.active_flag),
        event_date: data.event_date ? new Date(data.event_date) : undefined,
        notes: data.notes || undefined,
      })),
    },
  });

  const membershipComponents = form.values.membership.map((data, idx) => (
    <div key={data.id}>
      <Group grow mb="lg" align="baseline">
        <TextInput
          icon={<IconBuilding />}
          label="Alapszervezet neve"
          name="organization_name"
          placeholder="Alapszervezet neve..."
          title="Alapszervezet neve"
          readOnly
          {...form.getInputProps(`membership.${idx}.organization_name`)}
        />
        <Input.Wrapper id="event_date" label="Státusz dátuma" required title="Státusz dátuma">
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
            {...form.getInputProps(`membership.${idx}.event_date`)}
          />
        </Input.Wrapper>
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
          {...form.getInputProps(`membership.${idx}.active_flag`)}
        />
      </Group>
      <Group grow mb="lg" align="baseline">
        <Input.Wrapper id="notes" label="Megjegyzés" title="Megjegyzés">
          <Textarea
            autosize
            icon={<IconNote />}
            id="notes"
            maxRows={10}
            minRows={3}
            name="notes"
            placeholder="Megyjegyzés..."
            {...form.getInputProps(`membership.${idx}.notes`)}
          />
        </Input.Wrapper>
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
            <Input.Wrapper id="person_name" label="Név" required title="Név">
              <TextInput
                icon={<IconUser />}
                id="person_name"
                name="person_name"
                placeholder="Név..."
                {...form.getInputProps("person_name")}
              />
            </Input.Wrapper>
            <Input.Wrapper id="birthdate" label="Születési dátum" required title="Születési dátum">
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
            </Input.Wrapper>
          </Group>
          <Group grow mb="lg" align="baseline">
            <Input.Wrapper id="mother_name" label="Anyja neve" required title="Anyja neve">
              <TextInput
                icon={<IconWoman />}
                id="mother_name"
                name="mother_name"
                placeholder="Anyja neve..."
                {...form.getInputProps("mother_name")}
              />
            </Input.Wrapper>
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
            <Input.Wrapper id="identity_card_number" label="Személyi igazolvány szám" title="Személyi igazolvány szám">
              <TextInput
                icon={<IconId />}
                id="identity_card_number"
                name="identity_card_number"
                placeholder="Személyi igazolvány szám..."
                {...form.getInputProps("identity_card_number")}
              />
            </Input.Wrapper>
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
            <Input.Wrapper id="notes" label="Megjegyzés" title="Megjegyzés">
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
            </Input.Wrapper>
          </Group>
        </Paper>
      </Container>
      <ContactInfo
        entityId={personData.person.person_id}
        entityType="person"
        form={form as unknown as UseFormReturnType<PersonDetailFormType | OrganizationDetailFormType>}
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
