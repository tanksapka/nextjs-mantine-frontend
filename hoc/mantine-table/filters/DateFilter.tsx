import { useState } from "react";
import { ActionIcon, Anchor, Button, Divider, Group, Popover, Radio } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useSetState } from "@mantine/hooks";
import { IconCalendar, IconFilter } from "@tabler/icons";

function DateFilter(props: any): JSX.Element {
  const {
    column: { filterValue, setFilter },
  } = props;
  const [opened, setOpened] = useState(false);
  const [state, setState] = useSetState(filterValue || { operator: "eq", value: null });

  const handleClose = () => {
    setState(filterValue || { operator: "cont", value: null });
    setOpened(false);
  };

  const handleClear = () => {
    setFilter(undefined);
    setState({ operator: "cont", value: null });
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
      // onClick={(e) => e.stopPropagation()}
      position="bottom"
      transition="scale-y"
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
          <Radio value="eq" label="Equals" />
          <Radio value="not_eq" label="Does not equal" />
          <Radio value="gt" label="After" />
          <Radio value="gteq" label="After or on" />
          <Radio value="lt" label="Before" />
          <Radio value="lteq" label="Before or on" />
        </Radio.Group>
        <Divider my="sm" />
        <DatePicker
          icon={<IconCalendar />}
          placeholder="Pick date"
          mb="sm"
          withinPortal={false}
          value={state.value}
          onChange={(val) => setState({ value: val })}
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

export default DateFilter;
