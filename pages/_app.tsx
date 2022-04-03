import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, MantineProvider } from "@mantine/core";
import AppHeader from "../components/app-header/AppHeader";
import AppNav from "../components/app-nav/AppNav";
import { IconBuilding, IconCoin, IconUser } from "@tabler/icons";

function MyApp({ Component, pageProps }: AppProps) {
  const navItemsList = [
    { icon: <IconUser />, text: "Személyek", link: "/people" },
    { icon: <IconBuilding />, text: "Szervezetek", link: "/organziations" },
    { icon: <IconCoin />, text: "Tagdíjak", link: "/fees" },
  ];

  return (
    <>
      <Head>
        <title>Membership DB</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppShell header={<AppHeader />} navbar={<AppNav navItems={navItemsList} />}>
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default MyApp;
