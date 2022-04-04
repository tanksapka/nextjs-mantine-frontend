import { Group, Input, Textarea } from "@mantine/core";
import { IconBadge, IconCalendar, IconCoin, IconHash, IconId } from "@tabler/icons";

function Person() {
  return (
    <>
      <Group>
        <Input icon={<IconHash />} placeholder="Regisztrációs szám" />
        <Input icon={<IconId />} placeholder="Tagsági szám" />
      </Group>
      <Group>
        <Input placeholder="Név" />
        <Input icon={<IconCalendar />} placeholder="Születési dátum" />
      </Group>
      <Group>
        <Input placeholder="Anyja neve" />
        <Input placeholder="Nem" />
      </Group>
      <Group>
        <Input icon={IconBadge} placeholder="Személyi igazolvány szám" />
        <Input icon={IconCoin} placeholder="Tagdíj kategória" />
      </Group>
      <Group>
        <Textarea placeholder="Megyjegyzés" />
      </Group>
    </>
  );
}

export default Person;
