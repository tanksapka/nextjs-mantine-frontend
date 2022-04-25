import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, MantineProvider } from "@mantine/core";
import AppHeader from "../components/app-header/AppHeader";
import AppNav from "../components/app-nav/AppNav";
import { IconBuilding, IconCoin, IconSettings, IconUser } from "@tabler/icons";

function MyApp({ Component, pageProps }: AppProps) {
  const navItemsList = [
    { icon: <IconUser />, text: "Személyek", link: "/people" },
    { icon: <IconBuilding />, text: "Szervezetek", link: "/organziations" },
    { icon: <IconCoin />, text: "Tagdíjak", link: "/fees" },
    { icon: <IconSettings />, text: "Beállítások", link: "/settings" },
  ];

  return (
    <>
      <Head>
        <title>Membership DB</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppShell
          header={<AppHeader />}
          navbar={<AppNav navItems={navItemsList} />}
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}
        >
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default MyApp;
