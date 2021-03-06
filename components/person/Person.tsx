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
          notes: data.notes || undefined,
        }))
      ),
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
          {...form.getListInputProps("membership", idx, "organization_name")}
        />
        <InputWrapper id="event_date" label="St??tusz d??tuma" required title="St??tusz d??tuma">
          <DatePicker
            // allowFreeInput
            icon={<IconCalendarEvent />}
            id="event_date"
            inputFormat="YYYY.MM.DD"
            labelFormat="YYYY MMMM"
            locale="hu"
            name="event_date"
            placeholder="St??tusz d??tuma..."
            disabled
            {...form.getListInputProps("membership", idx, "event_date")}
          />
        </InputWrapper>
      </Group>
      <Group grow mb="lg" align="baseline">
        <Checkbox
          style={{ alignSelf: "flex-end" }}
          defaultChecked
          label="Akt??v tag?"
          name="active_flag"
          readOnly
          required
          title="Akt??v tag?"
          {...form.getListInputProps("membership", idx, "active_flag")}
        />
      </Group>
      <Group grow mb="lg" align="baseline">
        <InputWrapper id="notes" label="Megjegyz??s" title="Megjegyz??s">
          <Textarea
            autosize
            icon={<IconNote />}
            id="notes"
            maxRows={10}
            minRows={3}
            name="notes"
            placeholder="Megyjegyz??s..."
            {...form.getListInputProps("membership", idx, "notes")}
          />
        </InputWrapper>
      </Group>
    </div>
  ));

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Container size="sm" my="xl">
        <Title order={1} mb="xl">
          Szem??lyes adatok
        </Title>
        <Paper shadow="xs" p="md">
          <Group grow mb="lg" align="baseline">
            <TextInput
              icon={<IconHash />}
              label="Regisztr??ci??s sz??m"
              name="registration_number"
              placeholder="Regisztr??ci??s sz??m..."
              title="Regisztr??ci??s sz??m"
              readOnly
              {...form.getInputProps("registration_number")}
            />
            <TextInput
              icon={<IconIdBadge2 />}
              label="Tags??gi sz??m"
              name="membership_id"
              placeholder="Tags??gi sz??m..."
              readOnly
              title="Tags??gi sz??m"
              {...form.getInputProps("membership_id")}
            />
          </Group>
          <Group grow mb="lg" align="baseline">
            <InputWrapper id="person_name" label="N??v" required title="N??v">
              <TextInput
                icon={<IconUser />}
                id="person_name"
                name="person_name"
                placeholder="N??v..."
                {...form.getInputProps("person_name")}
              />
            </InputWrapper>
            <InputWrapper id="birthdate" label="Sz??let??si d??tum" required title="Sz??let??si d??tum">
              <DatePicker
                allowFreeInput
                icon={<IconCake />}
                id="birthdate"
                inputFormat="YYYY.MM.DD"
                labelFormat="YYYY MMMM"
                locale="hu"
                name="birthdate"
                placeholder="Sz??let??si d??tum..."
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
            <InputWrapper id="identity_card_number" label="Szem??lyi igazolv??ny sz??m" title="Szem??lyi igazolv??ny sz??m">
              <TextInput
                icon={<IconId />}
                id="identity_card_number"
                name="identity_card_number"
                placeholder="Szem??lyi igazolv??ny sz??m..."
                {...form.getInputProps("identity_card_number")}
              />
            </InputWrapper>
            <Select
              icon={<IconCoin />}
              label="Tagd??j kateg??ria"
              name="membership_fee_category_id"
              placeholder="Tagd??j kateg??ria..."
              required
              title="Tagd??j kateg??ria"
              data={personData.membership_fee_type}
              {...form.getInputProps("membership_fee_category_id")}
            />
          </Group>
          <Group grow mb="lg" align="baseline">
            <InputWrapper id="notes" label="Megjegyz??s" title="Megjegyz??s">
              <Textarea
                autosize
                icon={<IconNote />}
                id="notes"
                maxRows={10}
                minRows={3}
                name="notes"
                placeholder="Megyjegyz??s..."
                {...form.getInputProps("notes")}
              />
            </InputWrapper>
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
          Tags??gi adatok
        </Title>
        <Paper shadow="xs" p="md">
          {membershipComponents}
        </Paper>
      </Container>
      <Group position="right" mt="xl">
        <Button type="submit">Ment??s</Button>
      </Group>
    </form>
  );
}

export { Person };
