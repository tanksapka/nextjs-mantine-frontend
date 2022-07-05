import { Container, LoadingOverlay, Paper, Tabs } from "@mantine/core";
import { IconCoin, IconGenderBigender, IconHome, IconMail, IconPhone } from "@tabler/icons";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import Mapping from "../../components/mapping/Mapping";
import { MappingPropsType, MappingRawDataType } from "../../types/mappings";
import { getMappings } from "../../utils/mappings";

function SettingsPage({
  genderTypeData,
  membershipFeeTypeData,
  addressTypeData,
  emailTypeData,
  phoneTypeData,
  userId,
}: MappingPropsType & { userId: string }) {
  const { isLoading, isFetching, data } = useQuery(["settings"], getMappings, {
    initialData: { genderTypeData, membershipFeeTypeData, addressTypeData, emailTypeData, phoneTypeData },
  });

  return (
    <Container>
      <Paper shadow="xs">
        <LoadingOverlay visible={isLoading || isFetching} />
        <Tabs p={"md"}>
          <Tabs.Tab icon={<IconGenderBigender />} label="Nemek">
            <Mapping mappingData={data?.genderTypeData as MappingRawDataType[]} userId={userId} />
          </Tabs.Tab>
          <Tabs.Tab icon={<IconCoin />} label="Tagdíjak">
            <Mapping mappingData={data?.membershipFeeTypeData as MappingRawDataType[]} userId={userId} />
          </Tabs.Tab>
          <Tabs.Tab icon={<IconHome />} label="Címek">
            <Mapping mappingData={data?.addressTypeData as MappingRawDataType[]} userId={userId} />
          </Tabs.Tab>
          <Tabs.Tab icon={<IconMail />} label="Emailek">
            <Mapping mappingData={data?.emailTypeData as MappingRawDataType[]} userId={userId} />
          </Tabs.Tab>
          <Tabs.Tab icon={<IconPhone />} label="Telefonok">
            <Mapping mappingData={data?.phoneTypeData as MappingRawDataType[]} userId={userId} />
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
