// - define default values
// - gather input props
// - define validation
// - define types -> move types into types folder to be shared
// - reference to removeErrors function -> move it to a util folder

import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { SelectDataType } from "../../types/general";
import { AddressDetailType, OrgAddressDetailType } from "../../types/address-detail";
import { ActionIcon, Divider, Group, InputWrapper, Select, Text, TextInput } from "@mantine/core";
import { IconBuildingCommunity, IconDirections, IconHome, IconMailbox, IconTrash } from "@tabler/icons";
import { removeErrors } from "../../utils/util";
import { FormList } from "@mantine/form/lib/form-list/form-list";

interface AddressType {
  idx: number;
  form: UseFormReturnType<{ addresses: FormList<AddressDetailType | OrgAddressDetailType> }>;
  addressTypeData: Array<SelectDataType>;
}

function Address({ idx, form, addressTypeData }: AddressType): JSX.Element {
  // idx, form itself, addressTypeData

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
                form.removeListItem("addresses", idx);
                removeErrors(`addresses.${idx}`, form);
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
          {...form.getListInputProps("addresses", idx, "address_type_id")}
        />
        <InputWrapper id="zip" label="Irányítószám" required title="Irányítószám">
          <TextInput
            icon={<IconMailbox />}
            id="zip"
            name="zip"
            placeholder="Irányítószám..."
            {...form.getListInputProps("addresses", idx, "zip")}
          />
        </InputWrapper>
        <InputWrapper id="city" label="Helység" required title="Helység">
          <TextInput
            icon={<IconBuildingCommunity />}
            id="city"
            name="city"
            placeholder="Helység..."
            {...form.getListInputProps("addresses", idx, "city")}
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
            {...form.getListInputProps("addresses", idx, "address_1")}
          />
        </InputWrapper>
        <InputWrapper id="address_2" label="Cím 2" title="Cím 2">
          <TextInput
            icon={<IconHome />}
            id="address_2"
            name="address_2"
            placeholder="Cím 2..."
            {...form.getListInputProps("addresses", idx, "address_2")}
          />
        </InputWrapper>
      </Group>
    </div>
  );
}

export { Address };
export type { AddressType };
