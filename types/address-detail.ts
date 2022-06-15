import * as Yup from "yup";

interface AddressType {
  id: string;
  address_type_id: string;
  zip: string;
  city: string;
  address_1: string;
  address_2?: string;
}

interface AddressDetailType extends AddressType {
  person_id: string;
}

interface OrgAddressDetailType extends AddressType {
  organization_id: string;
}

const defaultAddress: AddressType = {
  id: "",
  address_type_id: "",
  zip: "",
  city: "",
  address_1: "",
  address_2: "",
};

function defaultAddressData(personId: string): AddressDetailType {
  return { ...defaultAddress, person_id: personId };
}

function defaultOrgAddressData(organizationId: string): OrgAddressDetailType {
  return { ...defaultAddress, organization_id: organizationId };
}

const addressValidation = Yup.array()
  .of(
    Yup.object().shape({
      address_type_id: Yup.string().required("Cím típus kitöltése kötelező"),
      zip: Yup.string().required("Irányítószám kitöltése kötelező"),
      city: Yup.string().required("Helység kitöltése kötelező"),
      address_1: Yup.string().required("Cím kitöltése kötelező"),
      address_2: Yup.string().nullable(),
    })
  )
  .test("UniqueAddress", "Cím típusa nem ismétlődhet", (values, ctx) => {
    const extracted = values ? values.map((data) => data.address_type_id) : [];
    const uniqueData = Array.from(new Set(extracted));
    const countMap = extracted.reduce((prev, current) => prev.set(current, (prev.get(current) || 0) + 1), new Map());
    if (uniqueData.length === extracted?.length) return true;
    const errors = extracted.map((item, idx) =>
      countMap.get(item) > 1 ? ctx.createError({ path: `${ctx.path}.${idx}.address_type_id` }) : false
    );
    return errors.filter((err) => err !== false).at(-1) || true;
  });

export type { AddressDetailType, OrgAddressDetailType };
export { addressValidation, defaultAddressData, defaultOrgAddressData };
