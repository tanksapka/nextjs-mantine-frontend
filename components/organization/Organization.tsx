import { Button, Checkbox, Container, Group, InputWrapper, Paper, Textarea, TextInput, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { formList, useForm, yupResolver } from "@mantine/form";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import {
  IconBuilding,
  IconBuildingSkyscraper,
  IconCake,
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
      organization_name: organizationData.organization.organization_name,
      parent_organization_name: organizationData.organization.parent_organization_name,
      description: organizationData.organization.description || undefined,
      accepts_members_flag: convertToBool(organizationData.organization.accepts_members_flag),
      establishment_date: new Date(organizationData.organization.establishment_date),
      termination_date: organizationData.organization.termination_date
        ? new Date(organizationData.organization.termination_date)
        : undefined,
      notes: organizationData.organization.notes || undefined,
      address: formList(organizationData.address.map((data) => ({ ...data, address_2: data.address_2 || undefined }))),
      email: formList(
        organizationData.email.map((data) => ({
          ...data,
          messenger: convertToBool(data.messenger),
          skype: convertToBool(data.skype),
        }))
      ),
      phone: formList(
        organizationData.phone.map((data) => ({
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
              title="Szervezet név"
              readOnly
              {...form.getInputProps("organization_name")}
            />
            <TextInput
              icon={<IconBuildingSkyscraper />}
              label="Szülő szervezet név"
              name="parent_organization_name"
              placeholder="Szülő szervezet név..."
              readOnly
              title="Szülő szervezet név"
              {...form.getInputProps("parent_organization_name")}
            />
          </Group>
          <Group grow mb="lg" align="baseline">
            <InputWrapper id="description" label="Rövid leírás" title="Rövid leírás">
              <TextInput
                icon={<IconFileDescription />}
                id="description"
                name="description"
                placeholder="Rövid leírás..."
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
            <InputWrapper id="establishment_date" label="Alapítás dátum" required title="Alapítás dátum">
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
            </InputWrapper>
            <InputWrapper id="termination_date" label="Megszüntetés dátum" title="Megszüntetés dátum">
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
            </InputWrapper>
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
        entityId={organizationData.organization.id}
        entityType="organization"
        form={form as UseFormReturnType<PersonDetailFormType | OrganizationDetailFormType>}
        addressTypeData={organizationData.address_type}
        emailTypeData={organizationData.email_type}
        phoneTypeData={organizationData.phone_type}
      />
      <Group position="right" mt="xl">
        <Button type="submit">Mentés</Button>
      </Group>
    </form>
  );
}

export { Organization };
export type { OrganizationDataType };
