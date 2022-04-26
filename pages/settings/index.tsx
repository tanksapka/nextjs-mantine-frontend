import { Tabs } from "@mantine/core";
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
}: MappingPropsType) {
  return (
    <Tabs>
      <Tabs.Tab label="Nemek">
        <Mapping mappingData={genderTypeData} />
      </Tabs.Tab>
      <Tabs.Tab label="Tagdíjak">
        <Mapping mappingData={membershipFeeTypeData} />
      </Tabs.Tab>
      <Tabs.Tab label="Címek">
        <Mapping mappingData={addressTypeData} />
      </Tabs.Tab>
      <Tabs.Tab label="Emailek">
        <Mapping mappingData={emailTypeData} />
      </Tabs.Tab>
      <Tabs.Tab label="Telefonok">
        <Mapping mappingData={phoneTypeData} />
      </Tabs.Tab>
    </Tabs>
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
    props: mappingData,
  };
};
