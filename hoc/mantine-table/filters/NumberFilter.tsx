import { useState } from "react";
import { ActionIcon, Anchor, Button, Divider, Group, NumberInput, Popover, Radio, RadioGroup } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { IconFilter } from "@tabler/icons";

function NumberFilter(props: any): JSX.Element {
  const {
    column: { filterValue, setFilter, filterOptions },
  } = props;
  const { min, max, step } = filterOptions || {};
  const [opened, setOpened] = useState(false);
  const [state, setState] = useSetState(filterValue || { operator: "cont", value: undefined });

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
        <Radio value="eq" label="Equals" />
        <Radio value="not_eq" label="Not equal" />
        <Radio value="gt" label="Greater than" />
        <Radio value="gteq" label="Greater than or equal" />
        <Radio value="lt" label="Less than" />
        <Radio value="lteq" label="Less than or equal" />
      </RadioGroup>
      <Divider my="sm" />
      <NumberInput
        placeholder="Enter number"
        mb="sm"
        hideControls
        data-autoFocus
        min={min}
        max={max}
        step={step}
        value={state.value}
        onChange={(val) => setState({ value: val })}
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

export default NumberFilter;
