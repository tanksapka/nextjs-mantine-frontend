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
    <div>
      <Mapping mappingData={genderTypeData} />
    </div>
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
