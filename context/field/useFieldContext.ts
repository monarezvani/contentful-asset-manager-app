"use client";

import { useContext } from "react";
import { Notification } from "@contentful/f36-components";
import { FieldContext } from "./FieldContext";

export const useFieldContext = () => {
    const context = useContext(FieldContext);

    if (!context) {
        Notification.error("useFieldContext must be used within a FieldContextProvider");
    }

    const [state, dispatch] = context;

    return { state, dispatch };
};
