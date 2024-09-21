"use client";

import { useMemo, useReducer } from "react";
import { ContextDefaultValue, DialogContext } from "./DialogContext";
import { dialogReducer } from "./dialogReducer";
import { defaultState } from "./types";

export const DialogContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(dialogReducer, defaultState);
    const value: ContextDefaultValue = useMemo(() => [state, dispatch], [state]);

    return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};
