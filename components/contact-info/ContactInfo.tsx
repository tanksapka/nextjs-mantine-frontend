import { ActionIcon, Container, Group, Paper, Text, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { IconInfoCircle, IconPlus } from "@tabler/icons";
import { defaultAddressData, defaultOrgAddressData } from "../../types/address-detail";
import { defaultEmailData, defaultOrgEmailData } from "../../types/email-detail";
import { SelectDataType } from "../../types/general";
import { OrganizationDetailFormType } from "../../types/organization-detail";
import { PersonDetailFormType } from "../../types/person-detail";
import { defaultOrgPhoneData, defaultPhoneData } from "../../types/phone-detail";
import { Address } from "../address/Address";
import { Email } from "../email/Email";
import { Phone } from "../phone/Phone";

interface ContactInfoType {
  entityId: string;
  entityType: "person" | "organization";
  form: UseFormReturnType<PersonDetailFormType | OrganizationDetailFormType>;
  addressTypeData: Array<SelectDataType>;
  emailTypeData: Array<SelectDataType>;
  phoneTypeData: Array<SelectDataType>;
}

function ContactInfo({ entityId, entityType, form, addressTypeData, emailTypeData, phoneTypeData }: ContactInfoType) {
  const addressFields = form.values.address.map((_, idx) => (
    <Address key={idx} idx={idx} form={form} addressTypeData={addressTypeData} />
  ));

  const emailFields = form.values.email.map((_, idx) => (
    <Email key={idx} idx={idx} form={form} emailTypeData={emailTypeData} />
  ));

  const phoneFields = form.values.phone.map((_, idx) => (
    <Phone key={idx} idx={idx} form={form} phoneTypeData={phoneTypeData} />
  ));

  return (
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
            onClick={() =>
              form.addListItem(
                "address",
                entityType === "person" ? defaultAddressData(entityId) : defaultOrgAddressData(entityId)
              )
            }
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
            onClick={() =>
              form.addListItem(
                "email",
                entityType === "person" ? defaultEmailData(entityId) : defaultOrgEmailData(entityId)
              )
            }
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
            onClick={() =>
              form.addListItem(
                "phone",
                entityType === "person" ? defaultPhoneData(entityId) : defaultOrgPhoneData(entityId)
              )
            }
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
  );
}

export { ContactInfo };
export type { ContactInfoType };
