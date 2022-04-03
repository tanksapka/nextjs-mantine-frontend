import { Navbar } from "@mantine/core";
import NavbarItem, { NavbarItemType } from "../navbar-item/navbar-item";

export default function AppNav({ navItems }: any) {
  const navItemElements = navItems.map((item: NavbarItemType) => (
    <Navbar.Section key={item.link}>
      <NavbarItem {...item}></NavbarItem>
    </Navbar.Section>
  ));

  return (
    <Navbar width={{ base: 200 }} p="xs">
      {navItemElements}
    </Navbar>
  );
}
