import { useEffect } from "react";
import Router from "next/router";
import { UseFormInput, UseFormReturnType } from "@mantine/form/lib/use-form";
import { useForm } from "@mantine/form";
import { isDeepStrictEqual } from "util";

export function useFormCustom<Values = Record<string, unknown>>({
  initialValues = {} as Values,
  initialErrors = {},
}: // clearInputErrorOnChange = true,
// validateInputOnChange = false,
// validate: rules,
UseFormInput<Values>): any {
  const form = useForm({ initialValues, initialErrors });

  const isDirty = () => isDeepStrictEqual(form.values, initialValues) === false;

  return { ...form, isDirty };
}

export function useWarnIfUnsavedChanges(unsavedChanges: boolean) {
  const message = "Do you want to leave?";

  useEffect(() => {
    const routeChangeStart = (url: string) => {
      if (Router.asPath !== url && unsavedChanges && !confirm(message)) {
        Router.events.emit("routeChangeError");
        Router.replace(Router, Router.asPath);
        throw "Abort route change. Please ignore this error.";
      }
    };

    const beforeunload = (e: Event) => {
      if (unsavedChanges) {
        e.preventDefault();
        // e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", beforeunload);
    Router.events.on("routeChangeStart", routeChangeStart);

    return () => {
      window.removeEventListener("beforeunload", beforeunload);
      Router.events.off("routeChangeStart", routeChangeStart);
    };
  }, [unsavedChanges]);
}
