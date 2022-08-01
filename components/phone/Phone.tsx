import { UseFormReturnType } from "@mantine/form";
import { SelectDataType } from "../../types/general";
import { ActionIcon, Checkbox, Divider, Group, Input, Select, Text, TextInput } from "@mantine/core";
import { IconDeviceMobile, IconNumbers, IconPhone, IconTrash } from "@tabler/icons";
import { removeErrors } from "../../utils/util";
import { PersonDetailFormType } from "../../types/person-detail";
import { OrganizationDetailFormType } from "../../types/organization-detail";

interface PhoneType {
  idx: number;
  form: UseFormReturnType<PersonDetailFormType | OrganizationDetailFormType>;
  phoneTypeData: Array<SelectDataType>;
}

function Phone({ idx, form, phoneTypeData }: PhoneType): JSX.Element {
  return (
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
          {...form.getInputProps(`phone.${idx}.phone_type_id`)}
        />
        <Input.Wrapper id="phone_number" label="Telefonszám" required title="Telefonszám">
          <TextInput
            icon={<IconPhone />}
            id="phone_number"
            name="phone_number"
            placeholder="Telefonszám..."
            {...form.getInputProps(`phone.${idx}.phone_number`)}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Mellék" title="Mellék">
          <TextInput
            icon={<IconNumbers />}
            id="phone_extension"
            name="phone_extension"
            placeholder="Mellék..."
            {...form.getInputProps(`phone.${idx}.phone_extension`)}
          />
        </Input.Wrapper>
      </Group>
      <Group mb="lg" align="baseline">
        <Checkbox
          label="Messenger"
          name="messenger"
          title="Messenger"
          {...form.getInputProps(`phone.${idx}.messenger`, { type: "checkbox" })}
        />
        <Checkbox
          label="Skype"
          name="skype"
          title="Skype"
          {...form.getInputProps(`phone.${idx}.skype`, { type: "checkbox" })}
        />
        <Checkbox
          label="Viber"
          name="viber"
          title="Viber"
          {...form.getInputProps(`phone.${idx}.viber`, { type: "checkbox" })}
        />
        <Checkbox
          label="Whatsapp"
          name="whatsapp"
          title="Whatsapp"
          {...form.getInputProps(`phone.${idx}.whatsapp`, { type: "checkbox" })}
        />
      </Group>
    </div>
  );
}

export { Phone };
export type { PhoneType };
