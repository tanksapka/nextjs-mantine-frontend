import { Container, LoadingOverlay, Paper, Tabs } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCoin, IconGenderBigender, IconHome, IconMail, IconPhone, IconX } from "@tabler/icons";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();
  const { isLoading, isFetching, data } = useQuery(["settings"], getMappings, {
    initialData: { genderTypeData, membershipFeeTypeData, addressTypeData, emailTypeData, phoneTypeData },
  });
  const { mutate, isLoading: mutateIsLoading } = useMutation(
    ({ endpoint, values }: { endpoint: string; values: Array<MappingDataType> }) => sendMappings(endpoint, values),
    {
      onSuccess: () => queryClient.invalidateQueries(["settings"]),
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
          <Tabs.List>
            <Tabs.Tab value="genders" icon={<IconGenderBigender />}>
              Nemek
            </Tabs.Tab>
            <Tabs.Tab value="membership-fee-categories" icon={<IconCoin />}>
              Tagdíjak
            </Tabs.Tab>
            <Tabs.Tab value="address-types" icon={<IconHome />}>
              Címek
            </Tabs.Tab>
            <Tabs.Tab value="email-types" icon={<IconMail />}>
              Emailek
            </Tabs.Tab>
            <Tabs.Tab value="phone-types" icon={<IconPhone />}>
              Telefonok
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="genders">
            <Mapping
              mappingData={data?.genderTypeData as MappingRawDataType[]}
              fnMutate={(values: Array<MappingDataType>) => mutate({ endpoint: "genders", values })}
              userId={userId}
            />
          </Tabs.Panel>
          <Tabs.Panel value="membership-fee-categories">
            <Mapping
              mappingData={data?.membershipFeeTypeData as MappingRawDataType[]}
              fnMutate={(values: Array<MappingDataType>) => mutate({ endpoint: "membership-fee-categories", values })}
              userId={userId}
            />
          </Tabs.Panel>
          <Tabs.Panel value="address-types">
            <Mapping
              mappingData={data?.addressTypeData as MappingRawDataType[]}
              fnMutate={(values: Array<MappingDataType>) => mutate({ endpoint: "address-types", values })}
              userId={userId}
            />
          </Tabs.Panel>
          <Tabs.Panel value="email-types">
            <Mapping
              mappingData={data?.emailTypeData as MappingRawDataType[]}
              fnMutate={(values: Array<MappingDataType>) => mutate({ endpoint: "email-types", values })}
              userId={userId}
            />
          </Tabs.Panel>
          <Tabs.Panel value="phone-types">
            <Mapping
              mappingData={data?.phoneTypeData as MappingRawDataType[]}
              fnMutate={(values: Array<MappingDataType>) => mutate({ endpoint: "phone-types", values })}
              userId={userId}
            />
          </Tabs.Panel>
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
