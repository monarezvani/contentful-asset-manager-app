import { DialogContextProvider } from "@/context/dialog/DialogContextProvider";
import { Dialog } from "@/locations/dialog/Dialog";
import React from "react";


export const DialogWrapper = () => {
    return (
        <DialogContextProvider>
            <Dialog />
        </DialogContextProvider>
    );
};
