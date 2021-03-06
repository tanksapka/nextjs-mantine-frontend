import {
  Button,
  Checkbox,
  Container,
  Group,
  InputWrapper,
  Paper,
  Select,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { formList, useForm, yupResolver } from "@mantine/form";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import {
  IconBuilding,
  IconBuildingSkyscraper,
  IconCake,
  IconCalendarEvent,
  IconFileDescription,
  IconNote,
  IconWreckingBall,
} from "@tabler/icons";
import * as Yup from "yup";
import { addressValidation } from "../../types/address-detail";
import { emailValidation } from "../../types/email-detail";
import {
  OrganizationDataType,
  OrganizationDetailFormType,
  organizationValidation,
} from "../../types/organization-detail";
import { PersonDetailFormType } from "../../types/person-detail";
import { phoneValidation } from "../../types/phone-detail";
import { convertToBool } from "../../utils/util";
import { ContactInfo } from "../contact-info/ContactInfo";

function Organization({ organizationData }: { organizationData: OrganizationDataType }): JSX.Element {
  const schema = Yup.object().shape({
    ...organizationValidation,
    address: addressValidation,
    email: emailValidation,
    phone: phoneValidation,
  });

  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      organization_name: organizationData?.organization?.organization_name,
      parent_organization_id: organizationData?.organization?.parent_organization_id,
      description: organizationData?.organization?.description || undefined,
      accepts_members_flag: convertToBool(organizationData?.organization?.accepts_members_flag),
      establishment_date: organizationData?.organization?.establishment_date
        ? new Date(organizationData.organization.establishment_date)
        : undefined,
      termination_date: organizationData?.organization?.termination_date
        ? new Date(organizationData.organization.termination_date)
        : undefined,
      notes: organizationData?.organization?.notes || undefined,
      address: organizationData?.address
        ? formList(organizationData.address.map((data) => ({ ...data, address_2: data.address_2 || undefined })))
        : formList([{}]),
      email: organizationData?.email
        ? formList(
            organizationData.email.map((data) => ({
              ...data,
              messenger: convertToBool(data.messenger),
              skype: convertToBool(data.skype),
            }))
          )
        : formList([{}]),
      phone: organizationData?.phone
        ? formList(
            organizationData.phone.map((data) => ({
              ...data,
              phone_extension: data.phone_extension || undefined,
              messenger: convertToBool(data.messenger),
              skype: convertToBool(data.skype),
              viber: convertToBool(data.viber),
              whatsapp: convertToBool(data.whatsapp),
            }))
          )
        : formList([{}]),
      membership: organizationData?.membership
        ? formList(
            organizationData.membership.map((data) => ({
              ...data,
              active_flag: convertToBool(data.active_flag),
              event_date: data.event_date ? new Date(data.event_date) : undefined,
              notes: data.notes || undefined,
            }))
          )
        : formList([{}]),
    },
  });

  const membershipComponents = form.values.membership.map((data, idx) => (
    <div key={data.id}>
      <Group grow mb="lg" align="baseline">
        <TextInput
          icon={<IconBuilding />}
          label="Tag neve"
          name="person_name"
          placeholder="Tag neve..."
          title="Tag neve"
          readOnly
          {...form.getListInputProps("membership", idx, "person_name")}
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
          Szervezet adatok
        </Title>
        <Paper shadow="xs" p="md">
          <Group grow mb="lg" align="baseline">
            <TextInput
              icon={<IconBuilding />}
              label="Szervezet n??v"
              name="organization_name"
              placeholder="Szervezet n??v..."
              required
              title="Szervezet n??v"
              {...form.getInputProps("organization_name")}
            />
            <Select
              data={organizationData.parent_organizations.map((org) => ({
                value: org.organization_id,
                label: org.organization_name,
              }))}
              icon={<IconBuildingSkyscraper />}
              label="Sz??l?? szervezet n??v"
              name="parent_organization_name"
              placeholder="Sz??l?? szervezet n??v..."
              required
              title="Sz??l?? szervezet n??v"
              {...form.getInputProps("parent_organization_id")}
            />
          </Group>
          <Group grow mb="lg" align="baseline">
            <InputWrapper id="description" label="R??vid le??r??s" title="R??vid le??r??s">
              <TextInput
                icon={<IconFileDescription />}
                id="description"
                name="description"
                placeholder="R??vid le??r??s..."
                {...form.getInputProps("description")}
              />
            </InputWrapper>
          </Group>
          <Group grow mb="lg">
            <Checkbox
              style={{ alignSelf: "flex-end" }}
              defaultChecked
              label="Fogad tagokat?"
              name="accepts_members_flag"
              required
              title="Fogad tagokat?"
              {...form.getInputProps("accepts_members_flag")}
            />
          </Group>
          <Group grow mb="lg" align="baseline">
            <InputWrapper id="establishment_date" label="Alap??t??s d??tum" required title="Alap??t??s d??tum">
              <DatePicker
                allowFreeInput
                icon={<IconCake />}
                id="establishment_date"
                inputFormat="YYYY.MM.DD"
                labelFormat="YYYY MMMM"
                locale="hu"
                name="establishment_date"
                placeholder="Alap??t??s d??tum..."
                required
                {...form.getInputProps("establishment_date")}
              />
            </InputWrapper>
            <InputWrapper id="termination_date" label="Megsz??ntet??s d??tum" title="Megsz??ntet??s d??tum">
              <DatePicker
                allowFreeInput
                icon={<IconWreckingBall />}
                id="termination_date"
                inputFormat="YYYY.MM.DD"
                labelFormat="YYYY MMMM"
                locale="hu"
                name="termination_date"
                placeholder="Megsz??ntet??s d??tum..."
                {...form.getInputProps("termination_date")}
              />
            </InputWrapper>
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
        entityId={organizationData?.organization?.organization_id}
        entityType="organization"
        form={form as unknown as UseFormReturnType<PersonDetailFormType | OrganizationDetailFormType>}
        addressTypeData={organizationData.address_type}
        emailTypeData={organizationData.email_type}
        phoneTypeData={organizationData.phone_type}
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

export { Organization };
export type { OrganizationDataType };
