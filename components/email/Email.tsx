import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { SelectDataType } from "../../types/general";
import { ActionIcon, Checkbox, Divider, Group, InputWrapper, Select, Text, TextInput } from "@mantine/core";
import { IconAt, IconMail, IconTrash } from "@tabler/icons";
import { removeErrors } from "../../utils/util";
import { PersonDetailFormType } from "../../types/person-detail";
import { OrganizationDetailFormType } from "../../types/organization-detail";

interface EmailType {
  idx: number;
  form: UseFormReturnType<PersonDetailFormType | OrganizationDetailFormType>;
  emailTypeData: Array<SelectDataType>;
}

function Email({ idx, form, emailTypeData }: EmailType): JSX.Element {
  return (
    <div key={idx}>
      <Divider
        mb="xs"
        label={
          <>
            <IconMail />
            <Text ml="xs">Email #{idx + 1}</Text>
            <ActionIcon
              color="red"
              ml="xs"
              title="Email cím törlése"
              onClick={() => {
                form.removeListItem("email", idx);
                removeErrors(`email.${idx}`, form);
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </>
        }
      />
      <Group grow mb="lg" align="baseline">
        <Select
          data={emailTypeData}
          icon={<IconMail />}
          label="Email cím típusa"
          name="email_type_id"
          placeholder="Email cím típusa..."
          required
          title="Email cím típusa"
          {...form.getListInputProps("email", idx, "email_type_id")}
        />
        <InputWrapper id="email" label="Email" required title="Email">
          <TextInput
            icon={<IconAt />}
            id="email"
            name="email"
            placeholder="Email..."
            type="email"
            {...form.getListInputProps("email", idx, "email")}
          />
        </InputWrapper>
      </Group>
      <Group mb="lg" align="baseline">
        <Checkbox
          label="Messenger"
          name="messenger"
          title="Messenger"
          {...form.getListInputProps("email", idx, "messenger", { type: "checkbox" })}
        />
        <Checkbox
          label="Skype"
          name="skype"
          title="Skype"
          {...form.getListInputProps("email", idx, "skype", { type: "checkbox" })}
        />
      </Group>
    </div>
  );
}

export { Email };
export type { EmailType };
