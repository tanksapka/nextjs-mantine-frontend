import * as Yup from "yup";
import { ActionIcon, Button, Checkbox, Container, Grid, Group, Input, TextInput } from "@mantine/core";
import { yupResolver } from "@mantine/form";
import { IconPlus } from "@tabler/icons";
import { defaultMapping, MappingDataType, MappingRawDataType, mappingValidation } from "../../types/mappings";
import { convertToBool } from "../../utils/util";
import { useFormCustom, useWarnIfUnsavedChanges } from "../../utils/hooks";

function coerceResult(item: MappingRawDataType): MappingDataType {
  return {
    ...item,
    description: item?.description || "",
    created_on: new Date(item.created_on),
    valid_flag: convertToBool(item.valid_flag),
  };
}

function Mapping({
  mappingData,
  fnMutate,
  userId,
}: {
  mappingData: Array<MappingRawDataType>;
  fnMutate: (values: Array<MappingDataType>) => void;
  userId: string;
}): JSX.Element {
  const form = useFormCustom({
    validate: yupResolver(Yup.object().shape({ mapping: mappingValidation })),
    initialValues: {
      mapping: mappingData.map(coerceResult),
    },
  });
  console.log(form.isDirty);
  useWarnIfUnsavedChanges(form.isDirty, "Lelépsz?");

  const fields = form.values.mapping.map((_, idx) => (
    <Grid key={idx}>
      <Grid.Col span={3}>
        <Input.Wrapper id="name" required label={idx === 0 && "Típus"} size="md" title="Típus">
          <TextInput id="name" placeholder="Típus..." {...form.getInputProps(`mapping.${idx}.name`)} />
        </Input.Wrapper>
      </Grid.Col>
      <Grid.Col span={3}>
        <Input.Wrapper id="description" label={idx === 0 && "Leírás"} size="md" title="Leírás">
          <TextInput id="description" placeholder="Leírás..." {...form.getInputProps(`mapping.${idx}.description`)} />
        </Input.Wrapper>
      </Grid.Col>
      <Grid.Col span={1}>
        <Input.Wrapper id="valid_flag" label={idx === 0 && "Aktív?"} size="md" title="Aktív?">
          <Checkbox
            id="valid_flag"
            style={{ justifyContent: "center", paddingTop: 8, paddingBottom: 8 }}
            {...form.getInputProps(`mapping.${idx}.valid_flag`, { type: "checkbox" })}
          />
        </Input.Wrapper>
      </Grid.Col>
      <Grid.Col span={3}>
        <Input.Wrapper
          id="created_on"
          label={idx === 0 && "Hozzáadás dátuma"}
          size="md"
          title="Hozzáadás dátuma (automatikus)"
        >
          <TextInput id="created_on" readOnly {...form.getInputProps(`mapping.${idx}.created_on`)} />
        </Input.Wrapper>
      </Grid.Col>
      <Grid.Col span={2}>
        <Input.Wrapper id="created_by" label={idx === 0 && "Hozzáadó"} size="md" title="Hozzáadó (automatikus)">
          <TextInput id="created_by" readOnly {...form.getInputProps(`mapping.${idx}.created_by`)} />
        </Input.Wrapper>
      </Grid.Col>
    </Grid>
  ));

  return (
    <form onSubmit={form.onSubmit((values) => fnMutate(values.mapping))}>
      <Container>{fields}</Container>
      <Container>
        <Group position="right" mt="xl">
          <ActionIcon
            color="blue"
            title="Új típus hozzáadása"
            onClick={() => form.insertListItem("mapping", { ...defaultMapping, created_by: userId })}
          >
            <IconPlus />
          </ActionIcon>
          <Button type="submit">Mentés</Button>
        </Group>
      </Container>
    </form>
  );
}

export default Mapping;
