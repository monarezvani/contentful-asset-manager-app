"use client";

import { useContext } from "react";
import { Notification } from "@contentful/f36-components";
import { DialogContext } from "./DialogContext";

export const useDialogContext = () => {
    const context = useContext(DialogContext);

    if (!context) {
        Notification.error("useDialogContext must be used within a DialogContextProvider");
    }

    const [state, dispatch] = context;

    return { state, dispatch };
};
