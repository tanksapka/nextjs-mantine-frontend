import { Group, Input, Select, Textarea } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { IconBadge, IconCalendar, IconCoin, IconHash, IconId } from "@tabler/icons";

interface selectDataType {
  value: string;
  label: string;
}

function Person(genderData: Array<selectDataType>, membershipFeeData: Array<selectDataType>) {
  return (
    <>
      <Group>
        <Input icon={<IconHash />} placeholder="Regisztrációs szám" />
        <Input icon={<IconId />} placeholder="Tagsági szám" />
      </Group>
      <Group>
        <Input placeholder="Név" />
        <Calendar placeholder="Születési dátum" />
      </Group>
      <Group>
        <Input placeholder="Anyja neve" />
        <Select placeholder="Nem" data={genderData} />
      </Group>
      <Group>
        <Input icon={IconBadge} placeholder="Személyi igazolvány szám" />
        <Select icon={IconCoin} placeholder="Tagdíj kategória" data={membershipFeeData} />
      </Group>
      <Group>
        <Textarea placeholder="Megyjegyzés" />
      </Group>
    </>
  );
}

export default Person;
