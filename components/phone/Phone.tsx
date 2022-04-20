import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { SelectDataType } from "../../types/general";
import { ActionIcon, Checkbox, Divider, Group, InputWrapper, Select, Text, TextInput } from "@mantine/core";
import { IconDeviceMobile, IconNumbers, IconPhone, IconTrash } from "@tabler/icons";
import { removeErrors } from "../../utils/util";
import { FormList } from "@mantine/form/lib/form-list/form-list";

interface PhoneType {
  idx: number;
  form: UseFormReturnType<{
    registration_number: number;
    membership_id: string;
    person_name: string;
    birthdate: Date;
    mother_name: string;
    gender_id: string;
    identity_card_number: string;
    membership_fee_category_id: string;
    notes: string | undefined;
    address: FormList<any>;
    email: FormList<any>;
    phone: FormList<any>;
  }>;
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
  );
}

export { Phone };
export type { PhoneType };
