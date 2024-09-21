"use client";

import { useMemo, useReducer } from "react";
import { FieldContext, FieldContextValue } from "./FieldContext";
import { fieldReducer } from "./fieldReducer";
import { defaultState } from "./types";

export const FieldContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(fieldReducer, defaultState);
    const value: FieldContextValue = useMemo(() => [state, dispatch], [state]);

    return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>;
};
