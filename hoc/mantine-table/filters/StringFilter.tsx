import { useState } from "react";
import { ActionIcon, Anchor, Button, Divider, Group, Popover, Radio, TextInput } from "@mantine/core";
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
      opened={opened}
      onClose={handleClose}
      // onOpen={(e) => e.stopPropagation()}
      position="bottom"
      transition="scale-y"
      trapFocus
    >
      <Popover.Target>
        <ActionIcon
          size={18}
          variant={filterValue ? "light" : "subtle"}
          color={filterValue ? "blue" : "gray"}
          onClick={() => setOpened((o) => !o)}
        >
          <IconFilter />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Radio.Group
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
        </Radio.Group>
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
      </Popover.Dropdown>
    </Popover>
  );
}

export default StringFilter;
