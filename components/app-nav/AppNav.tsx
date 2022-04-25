import { Navbar } from "@mantine/core";
import NavbarItem, { NavbarItemType } from "../navbar-item/NavbarItem";

interface AppNavType {
  navItems: Array<NavbarItemType>;
}

function AppNav({ navItems }: AppNavType): JSX.Element {
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

export default AppNav;
export type { AppNavType };
