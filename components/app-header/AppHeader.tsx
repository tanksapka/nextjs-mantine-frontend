import styled from "@emotion/styled";
import { IconId } from "@tabler/icons";
import { Header, Title } from "@mantine/core";
import Link from "next/link";

export default function AppHeader() {
  const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 1rem;
    column-gap: 0.5rem;
    cursor: pointer;
  `;

  return (
    <Header height={60}>
      <Link href={"/"} passHref>
        <StyledWrapper>
          <IconId size={42}></IconId>
          <Title order={1}>Tagnyilvántartó</Title>
        </StyledWrapper>
      </Link>
    </Header>
  );
}
