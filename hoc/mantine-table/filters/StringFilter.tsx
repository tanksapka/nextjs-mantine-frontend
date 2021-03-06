import { useState } from "react";
import { ActionIcon, Anchor, Button, Divider, Group, Popover, Radio, RadioGroup, TextInput } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { IconFilter } from "@tabler/icons";

function StringFilter(props: any): JSX.Element {
  const {
    column: { filterValue, setFilter },
  } = props;
  const [opened, setOpened] = useState(false);
  const [state, setState] = useSetState(filterValue || { operator: "cont", value: "" });

  const handleClose = () => {
    setState(filterValue || { operator: "cont", value: "" });
    setOpened(false);
  };

  const handleClear = () => {
    setFilter(undefined);
    setState({ operator: "cont", value: "" });
    setOpened(false);
  };

  const handleApply = () => {
    setFilter(state);
    setOpened(false);
  };

  return (
    <Popover
      target={
        <ActionIcon
          size={18}
          variant={filterValue ? "light" : "hover"}
          color={filterValue ? "blue" : "gray"}
          onClick={() => setOpened((o) => !o)}
        >
          <IconFilter />
        </ActionIcon>
      }
      opened={opened}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
      position="bottom"
      transition="scale-y"
    >
      <RadioGroup
        description="Select your option"
        orientation="vertical"
        size="sm"
        value={state.operator}
        onChange={(o) => setState({ operator: o })}
      >
        <Radio value="cont" label="Contains" />
        <Radio value="not_cont" label="Does not contain" />
        <Radio value="start" label="Starts with" />
        <Radio value="end" label="Ends with" />
        <Radio value="eq" label="Equals" />
        <Radio value="not_eq" label="Not equal" />
      </RadioGroup>
      <Divider my="sm" />
      <TextInput
        placeholder="Enter text"
        mb="sm"
        data-autoFocus
        value={state.value}
        onChange={(e) => setState({ value: e.target.value })}
      />
      <Group position="apart">
        <Anchor component="button" color="gray" onClick={handleClear}>
          Clear
        </Anchor>
        <Button onClick={handleApply}>Apply</Button>
      </Group>
    </Popover>
  );
}

export default StringFilter;
