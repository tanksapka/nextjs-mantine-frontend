import { Button, Checkbox, Container, Grid, Group, InputWrapper, Text, TextInput } from "@mantine/core";
import { formList, useForm, yupResolver } from "@mantine/form";
import { useEffect, useRef } from "react";
import { MappingDataType, MappingRawDataType, mappingValidation } from "../../types/mappings";
import { convertToBool } from "../../utils/util";

function coerceResult(item: MappingRawDataType): MappingDataType {
  return {
    ...item,
    description: item.description || undefined,
    created_on: new Date(item.created_on),
    valid_flag: convertToBool(item.valid_flag),
  };
}

function Mapping({ mappingData }: { mappingData: Array<MappingRawDataType> }): JSX.Element {
  const form = useForm({
    schema: yupResolver(mappingValidation),
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
    <Grid key={idx} align="center">
      <Grid.Col span={3}>
        <InputWrapper id="name" required>
          <TextInput id="name" placeholder="..." {...form.getListInputProps("mapping", idx, "name")} />
        </InputWrapper>
      </Grid.Col>
      <Grid.Col span={3}>
        <TextInput placeholder="..." {...form.getListInputProps("mapping", idx, "description")} />
      </Grid.Col>
      <Grid.Col span={1}>
        <Checkbox {...form.getListInputProps("mapping", idx, "valid_flag", { type: "checkbox" })} />
      </Grid.Col>
      <Grid.Col span={3}>
        <TextInput readOnly {...form.getListInputProps("mapping", idx, "created_on")} />
      </Grid.Col>
      <Grid.Col span={2}>
        <TextInput readOnly {...form.getListInputProps("mapping", idx, "created_by")} />
      </Grid.Col>
    </Grid>
  ));

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Container>
        <Grid align="center">
          <Grid.Col span={3}>
            <Text>Típus</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>Leírás</Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text>Aktív?</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>Hozzáadás dátuma</Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text>Hozzáadó</Text>
          </Grid.Col>
        </Grid>
        {fields}
      </Container>
      <Container>
        <Group position="right" mt="xl">
          <Button type="submit">Mentés</Button>
        </Group>
      </Container>
    </form>
  );
}

export default Mapping;
