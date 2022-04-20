import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { SelectDataType } from "../../types/general";
import { ActionIcon, Divider, Group, InputWrapper, Select, Text, TextInput } from "@mantine/core";
import { IconBuildingCommunity, IconDirections, IconHome, IconMailbox, IconTrash } from "@tabler/icons";
import { removeErrors } from "../../utils/util";
import { FormList } from "@mantine/form/lib/form-list/form-list";

interface AddressType {
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
  addressTypeData: Array<SelectDataType>;
}

function Address({ idx, form, addressTypeData }: AddressType): JSX.Element {
  return (
    <div key={idx}>
      <Divider
        mb="xs"
        label={
          <>
            <IconHome />
            <Text ml="xs">Cím #{idx + 1}</Text>
            <ActionIcon
              color="red"
              ml="xs"
              title="Cím törlése"
              onClick={() => {
                form.removeListItem("address", idx);
                removeErrors(`address.${idx}`, form);
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </>
        }
      />
      <Group grow mb="lg" align="baseline">
        <Select
          data={addressTypeData.sort((a, b) => a.label.localeCompare(b.label))}
          icon={<IconDirections />}
          label="Cím típusa"
          name="address_type_id"
          placeholder="Cím típusa..."
          required
          title="Cím típusa"
          {...form.getListInputProps("address", idx, "address_type_id")}
        />
        <InputWrapper id="zip" label="Irányítószám" required title="Irányítószám">
          <TextInput
            icon={<IconMailbox />}
            id="zip"
            name="zip"
            placeholder="Irányítószám..."
            {...form.getListInputProps("address", idx, "zip")}
          />
        </InputWrapper>
        <InputWrapper id="city" label="Helység" required title="Helység">
          <TextInput
            icon={<IconBuildingCommunity />}
            id="city"
            name="city"
            placeholder="Helység..."
            {...form.getListInputProps("address", idx, "city")}
          />
        </InputWrapper>
      </Group>
      <Group grow mb="lg" align="baseline">
        <InputWrapper id="address_1" label="Cím 1" required title="Cím 1">
          <TextInput
            icon={<IconHome />}
            id="address_1"
            name="address_1"
            placeholder="Cím 1..."
            {...form.getListInputProps("address", idx, "address_1")}
          />
        </InputWrapper>
        <InputWrapper id="address_2" label="Cím 2" title="Cím 2">
          <TextInput
            icon={<IconHome />}
            id="address_2"
            name="address_2"
            placeholder="Cím 2..."
            {...form.getListInputProps("address", idx, "address_2")}
          />
        </InputWrapper>
      </Group>
    </div>
  );
}

export { Address };
export type { AddressType };
