import { FieldContextProvider } from "@/context/field/FieldContextProvider";
import { Field } from "@/locations/field/Field";
import React from "react";


export const FieldWrapper = () => {
    return (
        <FieldContextProvider>
            <Field />
        </FieldContextProvider>
    );
};
