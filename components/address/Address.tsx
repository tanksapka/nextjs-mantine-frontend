import { UseFormReturnType } from "@mantine/form";
import { SelectDataType } from "../../types/general";
import { ActionIcon, Divider, Group, Input, Select, Text, TextInput } from "@mantine/core";
import { IconBuildingCommunity, IconDirections, IconHome, IconMailbox, IconTrash } from "@tabler/icons";
import { removeErrors } from "../../utils/util";
import { OrganizationDetailFormType } from "../../types/organization-detail";
import { PersonDetailFormType } from "../../types/person-detail";

interface AddressType {
  idx: number;
  form: UseFormReturnType<PersonDetailFormType | OrganizationDetailFormType>;
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
          {...form.getInputProps(`address.${idx}.address_type_id`)}
        />
        <Input.Wrapper id="zip" label="Irányítószám" required title="Irányítószám">
          <TextInput
            icon={<IconMailbox />}
            id="zip"
            name="zip"
            placeholder="Irányítószám..."
            {...form.getInputProps(`address.${idx}.zip`)}
          />
        </Input.Wrapper>
        <Input.Wrapper id="city" label="Helység" required title="Helység">
          <TextInput
            icon={<IconBuildingCommunity />}
            id="city"
            name="city"
            placeholder="Helység..."
            {...form.getInputProps(`address.${idx}.city`)}
          />
        </Input.Wrapper>
      </Group>
      <Group grow mb="lg" align="baseline">
        <Input.Wrapper id="address_1" label="Cím 1" required title="Cím 1">
          <TextInput
            icon={<IconHome />}
            id="address_1"
            name="address_1"
            placeholder="Cím 1..."
            {...form.getInputProps(`address.${idx}.address_1`)}
          />
        </Input.Wrapper>
        <Input.Wrapper id="address_2" label="Cím 2" title="Cím 2">
          <TextInput
            icon={<IconHome />}
            id="address_2"
            name="address_2"
            placeholder="Cím 2..."
            {...form.getInputProps(`address.${idx}.address_2`)}
          />
        </Input.Wrapper>
      </Group>
    </div>
  );
}

export { Address };
export type { AddressType };
