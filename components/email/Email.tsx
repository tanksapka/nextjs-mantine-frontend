import { UseFormReturnType } from "@mantine/form";
import { SelectDataType } from "../../types/general";
import { ActionIcon, Checkbox, Divider, Group, Input, Select, Text, TextInput } from "@mantine/core";
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
          {...form.getInputProps(`email.${idx}.email_type_id`)}
        />
        <Input.Wrapper id="email" label="Email" required title="Email">
          <TextInput
            icon={<IconAt />}
            id="email"
            name="email"
            placeholder="Email..."
            type="email"
            {...form.getInputProps(`email.${idx}.email`)}
          />
        </Input.Wrapper>
      </Group>
      <Group mb="lg" align="baseline">
        <Checkbox
          label="Messenger"
          name="messenger"
          title="Messenger"
          {...form.getInputProps(`email.${idx}.messenger`, { type: "checkbox" })}
        />
        <Checkbox
          label="Skype"
          name="skype"
          title="Skype"
          {...form.getInputProps(`email.${idx}.skype`, { type: "checkbox" })}
        />
      </Group>
    </div>
  );
}

export { Email };
export type { EmailType };
