import * as Yup from "yup";
import { ActionIcon, Button, Checkbox, Container, Grid, Group, InputWrapper, Text, TextInput } from "@mantine/core";
import { formList, useForm, yupResolver } from "@mantine/form";
import { IconPlus } from "@tabler/icons";
import { useEffect, useRef } from "react";
import { defaultMapping, MappingDataType, MappingRawDataType, mappingValidation } from "../../types/mappings";
import { convertToBool } from "../../utils/util";
import { sendMappings } from "../../utils/mappings";

function coerceResult(item: MappingRawDataType): MappingDataType {
  return {
    ...item,
    description: item.description || undefined,
    created_on: new Date(item.created_on),
    valid_flag: convertToBool(item.valid_flag),
  };
}

function Mapping({ mappingData, userId }: { mappingData: Array<MappingRawDataType>; userId: string }): JSX.Element {
  const form = useForm({
    schema: yupResolver(Yup.object().shape({ mapping: mappingValidation })),
    initialValues: {
      mapping: formList(mappingData.map(coerceResult)),
    },
  });
  // const mounted = useRef(false);

  // useEffect(() => {
  //   if (mounted.current) {
  //     console.log(form.values);
  //   } else {
  //     mounted.current = true;
  //   }
  // }, [form.values]);

  const fields = form.values.mapping.map((_, idx) => (
    <Grid key={idx}>
      <Grid.Col span={3}>
        <InputWrapper id="name" required label={idx === 0 && "Típus"} size="md" title="Típus">
          <TextInput id="name" placeholder="Típus..." {...form.getListInputProps("mapping", idx, "name")} />
        </InputWrapper>
      </Grid.Col>
      <Grid.Col span={3}>
        <InputWrapper id="description" label={idx === 0 && "Leírás"} size="md" title="Leírás">
          <TextInput
            id="description"
            placeholder="Leírás..."
            {...form.getListInputProps("mapping", idx, "description")}
          />
        </InputWrapper>
      </Grid.Col>
      <Grid.Col span={1}>
        <InputWrapper id="valid_flag" label={idx === 0 && "Aktív?"} size="md" title="Aktív?">
          <Checkbox
            id="valid_flag"
            style={{ justifyContent: "center", paddingTop: 8, paddingBottom: 8 }}
            {...form.getListInputProps("mapping", idx, "valid_flag", { type: "checkbox" })}
          />
        </InputWrapper>
      </Grid.Col>
      <Grid.Col span={3}>
        <InputWrapper
          id="created_on"
          label={idx === 0 && "Hozzáadás dátuma"}
          size="md"
          title="Hozzáadás dátuma (automatikus)"
        >
          <TextInput id="created_on" readOnly {...form.getListInputProps("mapping", idx, "created_on")} />
        </InputWrapper>
      </Grid.Col>
      <Grid.Col span={2}>
        <InputWrapper id="created_by" label={idx === 0 && "Hozzáadó"} size="md" title="Hozzáadó (automatikus)">
          <TextInput id="created_by" readOnly {...form.getListInputProps("mapping", idx, "created_by")} />
        </InputWrapper>
      </Grid.Col>
    </Grid>
  ));

  return (
    <form onSubmit={form.onSubmit((values) => sendMappings("genders", values.mapping))}>
      <Container>{fields}</Container>
      <Container>
        <Group position="right" mt="xl">
          <ActionIcon
            color="blue"
            title="Új típus hozzáadása"
            onClick={() => form.addListItem("mapping", { ...defaultMapping, created_by: userId })}
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
