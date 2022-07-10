import { Container, LoadingOverlay, Paper, Tabs } from "@mantine/core";
import { FormList } from "@mantine/form/lib/form-list/form-list";
import { showNotification } from "@mantine/notifications";
import { IconCoin, IconGenderBigender, IconHome, IconMail, IconPhone, IconX } from "@tabler/icons";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useMutation, useQuery } from "react-query";
import Mapping from "../../components/mapping/Mapping";
import { MappingDataType, MappingPropsType, MappingRawDataType } from "../../types/mappings";
import { getMappings, sendMappings } from "../../utils/mappings";

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
  const { mutate, isLoading: mutateIsLoading } = useMutation(
    ({ endpoint, values }: { endpoint: string; values: FormList<MappingDataType> }) => sendMappings(endpoint, values),
    {
      onError: (error: AxiosError) =>
        showNotification({
          autoClose: false,
          title: `${error.response?.status} - ${error.response?.statusText}`,
          message: error.message,
          icon: <IconX size={18} />,
          color: "red",
        }),
    }
  );

  return (
    <Container>
      <Paper shadow="xs">
        <LoadingOverlay visible={isLoading || isFetching || mutateIsLoading} />
        <Tabs p={"md"}>
          <Tabs.Tab icon={<IconGenderBigender />} label="Nemek">
            <Mapping
              mappingData={data?.genderTypeData as MappingRawDataType[]}
              fnMutate={(values: FormList<MappingDataType>) => mutate({ endpoint: "genders", values })}
              userId={userId}
            />
          </Tabs.Tab>
          <Tabs.Tab icon={<IconCoin />} label="Tagdíjak">
            <Mapping
              mappingData={data?.membershipFeeTypeData as MappingRawDataType[]}
              fnMutate={(values: FormList<MappingDataType>) =>
                mutate({ endpoint: "membership-fee-categories", values })
              }
              userId={userId}
            />
          </Tabs.Tab>
          <Tabs.Tab icon={<IconHome />} label="Címek">
            <Mapping
              mappingData={data?.addressTypeData as MappingRawDataType[]}
              fnMutate={(values: FormList<MappingDataType>) => mutate({ endpoint: "address-types", values })}
              userId={userId}
            />
          </Tabs.Tab>
          <Tabs.Tab icon={<IconMail />} label="Emailek">
            <Mapping
              mappingData={data?.emailTypeData as MappingRawDataType[]}
              fnMutate={(values: FormList<MappingDataType>) => mutate({ endpoint: "email-types", values })}
              userId={userId}
            />
          </Tabs.Tab>
          <Tabs.Tab icon={<IconPhone />} label="Telefonok">
            <Mapping
              mappingData={data?.phoneTypeData as MappingRawDataType[]}
              fnMutate={(values: FormList<MappingDataType>) => mutate({ endpoint: "phone-types", values })}
              userId={userId}
            />
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
