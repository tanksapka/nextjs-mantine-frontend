import { UseFormReturnType } from "@mantine/form";

function convertToBool(value: string): boolean {
  return value === "Y" ? true : false;
}

function convertToBoolString(value: boolean): string {
  return value ? "Y" : "N";
}

function removeErrors(keyStub: string, form: UseFormReturnType<any>): void {
  const errorKeys = Object.keys(form.errors);
  const relevantKeys = errorKeys.map((value: string): { key: string; rel: boolean } => ({
    key: value,
    rel: value.startsWith(keyStub),
  }));

  for (let keyObj of relevantKeys) {
    if (keyObj.rel) delete form.errors[keyObj.key];
  }
}

export { convertToBool, convertToBoolString, removeErrors };
