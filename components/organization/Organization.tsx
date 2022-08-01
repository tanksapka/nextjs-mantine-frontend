import { Button, Checkbox, Container, Group, Input, Paper, Select, Textarea, TextInput, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, UseFormReturnType, yupResolver } from "@mantine/form";
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
    validate: yupResolver(schema),
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
        ? organizationData.address.map((data) => ({ ...data, address_2: data.address_2 || undefined }))
        : [{}],
      email: organizationData?.email
        ? organizationData.email.map((data) => ({
            ...data,
            messenger: convertToBool(data.messenger),
            skype: convertToBool(data.skype),
          }))
        : [{}],
      phone: organizationData?.phone
        ? organizationData.phone.map((data) => ({
            ...data,
            phone_extension: data.phone_extension || undefined,
            messenger: convertToBool(data.messenger),
            skype: convertToBool(data.skype),
            viber: convertToBool(data.viber),
            whatsapp: convertToBool(data.whatsapp),
          }))
        : [{}],
      membership: organizationData?.membership
        ? organizationData.membership.map((data) => ({
            ...data,
            active_flag: convertToBool(data.active_flag),
            event_date: data.event_date ? new Date(data.event_date) : undefined,
            notes: data.notes || undefined,
          }))
        : [{ id: "0" }],
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
          {...form.getInputProps(`membership.${idx}.person_name`)}
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
          Szervezet adatok
        </Title>
        <Paper shadow="xs" p="md">
          <Group grow mb="lg" align="baseline">
            <TextInput
              icon={<IconBuilding />}
              label="Szervezet név"
              name="organization_name"
              placeholder="Szervezet név..."
              required
              title="Szervezet név"
              {...form.getInputProps("organization_name")}
            />
            <Select
              data={organizationData.parent_organizations.map((org) => ({
                value: org.organization_id,
                label: org.organization_name,
              }))}
              icon={<IconBuildingSkyscraper />}
              label="Szülő szervezet név"
              name="parent_organization_name"
              placeholder="Szülő szervezet név..."
              required
              title="Szülő szervezet név"
              {...form.getInputProps("parent_organization_id")}
            />
          </Group>
          <Group grow mb="lg" align="baseline">
            <Input.Wrapper id="description" label="Rövid leírás" title="Rövid leírás">
              <TextInput
                icon={<IconFileDescription />}
                id="description"
                name="description"
                placeholder="Rövid leírás..."
                {...form.getInputProps("description")}
              />
            </Input.Wrapper>
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
            <Input.Wrapper id="establishment_date" label="Alapítás dátum" required title="Alapítás dátum">
              <DatePicker
                allowFreeInput
                icon={<IconCake />}
                id="establishment_date"
                inputFormat="YYYY.MM.DD"
                labelFormat="YYYY MMMM"
                locale="hu"
                name="establishment_date"
                placeholder="Alapítás dátum..."
                required
                {...form.getInputProps("establishment_date")}
              />
            </Input.Wrapper>
            <Input.Wrapper id="termination_date" label="Megszüntetés dátum" title="Megszüntetés dátum">
              <DatePicker
                allowFreeInput
                icon={<IconWreckingBall />}
                id="termination_date"
                inputFormat="YYYY.MM.DD"
                labelFormat="YYYY MMMM"
                locale="hu"
                name="termination_date"
                placeholder="Megszüntetés dátum..."
                {...form.getInputProps("termination_date")}
              />
            </Input.Wrapper>
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
        entityId={organizationData?.organization?.organization_id}
        entityType="organization"
        form={form as unknown as UseFormReturnType<PersonDetailFormType | OrganizationDetailFormType>}
        addressTypeData={organizationData.address_type}
        emailTypeData={organizationData.email_type}
        phoneTypeData={organizationData.phone_type}
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

export { Organization };
export type { OrganizationDataType };
