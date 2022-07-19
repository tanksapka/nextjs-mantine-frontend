import { useEffect, useState } from "react";
import Router from "next/router";
import { UseFormInput, UseFormReturnType } from "@mantine/form/lib/use-form";
import { useForm } from "@mantine/form";
import { isEqual } from "lodash";

interface CustomUseFormReturnType<T> extends UseFormReturnType<T> {
  isDirty: boolean;
}

function useFormCustom<
  T extends {
    [key: string]: any;
  }
>({ initialValues, initialErrors, validate: rules, schema }: UseFormInput<T>): CustomUseFormReturnType<T> {
  const [isDirty, setIsDirty] = useState(false);
  const form = useForm({ initialValues, initialErrors, validate: rules, schema });

  useEffect(() => {
    setIsDirty(!isEqual(form.values, initialValues));
  }, [form.values, initialValues]);

  return { ...form, isDirty };
}

function useWarnIfUnsavedChanges(unsavedChanges: boolean, message: string) {
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

export type { CustomUseFormReturnType };
export { useFormCustom, useWarnIfUnsavedChanges };
