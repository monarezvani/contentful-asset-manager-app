"use client";

import { DialogContextProvider } from "@/context/dialog/DialogContextProvider";
import { AppPage } from "@/locations/page/Page";
import React from "react";


export const PageWrapper = () => {
    return (
        <DialogContextProvider>
            <AppPage />
        </DialogContextProvider>
    );
};
