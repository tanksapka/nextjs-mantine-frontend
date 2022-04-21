import { formList, useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { addressValidation, OrgAddressDetailType } from "../../types/address-detail";
import { emailValidation, OrgEmailDetailType } from "../../types/email-detail";
import { OrganizationDetailType, organizationValidation } from "../../types/organization-detail";
import { OrgPhoneDetailType, phoneValidation } from "../../types/phone-detail";
import { convertToBool } from "../../utils/util";
import { Address } from "../address/Address";
import { Email } from "../email/Email";
import { SelectDataType } from "../person/person";
import { Phone } from "../phone/Phone";

interface OrganizationDataType {
  organization: OrganizationDetailType;
  address: Array<OrgAddressDetailType>;
  email: Array<OrgEmailDetailType>;
  phone: Array<OrgPhoneDetailType>;
  // membership: Array<MembershipDetailType>;
}

function Organization({
  organizationData,
  addressTypeData,
  emailTypeData,
  phoneTypeData,
}: {
  organizationData: OrganizationDataType;
  addressTypeData: Array<SelectDataType>;
  emailTypeData: Array<SelectDataType>;
  phoneTypeData: Array<SelectDataType>;
}): JSX.Element {
  const schema = Yup.object().shape({
    ...organizationValidation,
    address: addressValidation,
    email: emailValidation,
    phone: phoneValidation,
  });

  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      organization_name: organizationData.organization.organization_name,
      parent_organization_name: organizationData.organization.parent_organization_name,
      description: organizationData.organization.description,
      accepts_members_flag: convertToBool(organizationData.organization.accepts_members_flag),
      establishment_date: new Date(organizationData.organization.establishment_date),
      termination_date: new Date(organizationData.organization.termination_date),
      notes: organizationData.organization.notes || undefined,
      address: formList(organizationData.address.map((data) => ({ ...data, address_2: data.address_2 || undefined }))),
      email: formList(
        organizationData.email.map((data) => ({
          ...data,
          messenger: convertToBool(data.messenger),
          skype: convertToBool(data.skype),
        }))
      ),
      phone: formList(
        organizationData.phone.map((data) => ({
          ...data,
          phone_extension: data.phone_extension || undefined,
          messenger: convertToBool(data.messenger),
          skype: convertToBool(data.skype),
          viber: convertToBool(data.viber),
          whatsapp: convertToBool(data.whatsapp),
        }))
      ),
    },
  });

  // const addressFields = form.values.address.map((_, idx) => (
  //   <Address key={idx} idx={idx} form={form} addressTypeData={addressTypeData} />
  // ));

  // const emailFields = form.values.email.map((_, idx) => (
  //   <Email key={idx} idx={idx} form={form} emailTypeData={emailTypeData} />
  // ));

  // const phoneFields = form.values.phone.map((_, idx) => (
  //   <Phone key={idx} idx={idx} form={form} phoneTypeData={phoneTypeData} />
  // ));

  return <div>Org</div>;
}

export { Organization };
