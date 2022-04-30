import { Container, Paper, Tabs } from "@mantine/core";
import { IconCoin, IconGenderBigender, IconHome, IconMail, IconPhone } from "@tabler/icons";
import { GetServerSideProps } from "next";
import Mapping from "../../components/mapping/Mapping";
import { MappingPropsType } from "../../types/mappings";
import { getMappings } from "../../utils/mappings";

function SettingsPage({
  genderTypeData,
  membershipFeeTypeData,
  addressTypeData,
  emailTypeData,
  phoneTypeData,
  userId,
}: MappingPropsType & { userId: string }) {
  return (
    <Container>
      <Paper shadow="xs">
        <Tabs p={"md"}>
          <Tabs.Tab icon={<IconGenderBigender />} label="Nemek">
            <Mapping mappingData={genderTypeData} userId={userId} />
          </Tabs.Tab>
          <Tabs.Tab icon={<IconCoin />} label="Tagdíjak">
            <Mapping mappingData={membershipFeeTypeData} userId={userId} />
          </Tabs.Tab>
          <Tabs.Tab icon={<IconHome />} label="Címek">
            <Mapping mappingData={addressTypeData} userId={userId} />
          </Tabs.Tab>
          <Tabs.Tab icon={<IconMail />} label="Emailek">
            <Mapping mappingData={emailTypeData} userId={userId} />
          </Tabs.Tab>
          <Tabs.Tab icon={<IconPhone />} label="Telefonok">
            <Mapping mappingData={phoneTypeData} userId={userId} />
          </Tabs.Tab>
        </Tabs>
      </Paper>
    </Container>
  );
}

export default SettingsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const mappingData = await getMappings();

  if (!mappingData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { ...mappingData, userId: process.env.REACT_APP_USER_ID || "unknown" },
  };
};
