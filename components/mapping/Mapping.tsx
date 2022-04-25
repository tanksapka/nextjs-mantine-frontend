import { Checkbox, Container, Grid, InputWrapper, Text, TextInput } from "@mantine/core";
import { formList, useForm, yupResolver } from "@mantine/form";
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

  const fields = form.values.mapping.map((_, idx) => (
    <Grid key={idx} align="center">
      <Grid.Col span={2}>
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
    <Container>
      <Grid align="center">
        <Grid.Col span={2}>
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
  );
}

export default Mapping;
