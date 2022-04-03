import styled from "@emotion/styled";
import { Group, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

interface NavbarItemType {
  icon: React.ReactNode;
  text: string;
  link: string;
}

function NavbarItem({ icon, text, link }: NavbarItemType) {
  return (
    <Group
      sx={(theme) => ({
        cursor: "pointer",
        "&:hover": {
          backgroundColor: theme.colors.gray[1],
        },
        marginBottom: "0.5rem",
      })}
    >
      {icon}
      <Link href={link} passHref>
        <Text>{text}</Text>
      </Link>
    </Group>
  );
}

export default NavbarItem;
export type { NavbarItemType };
