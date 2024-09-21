"use client";

import { Dispatch, createContext } from "react";
import { FielAction, FieldState, defaultState } from "./types";

export type FieldContextValue = [FieldState, Dispatch<FielAction>];

export const FieldContext = createContext<FieldContextValue>([defaultState, () => {}]);
