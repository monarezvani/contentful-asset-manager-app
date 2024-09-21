"use client";

import { Dispatch, createContext } from "react";
import { DialogAction, DialogState, defaultState } from "./types";

export type ContextDefaultValue = [DialogState, Dispatch<DialogAction>];

export const DialogContext = createContext<ContextDefaultValue>([defaultState, () => {}]);
