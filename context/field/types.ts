import { ImageParameters } from "@/locations/field/types";

export type FielAction =
    | { type: FIELD_ACTION_TYPE.SET_SELECTED_IMAGE_PARAMETERS; payload: ImageParameters | null }
    | { type: FIELD_ACTION_TYPE.SET_IS_LOADING; payload: boolean };

export interface FieldState {
    selectedImageParameters: ImageParameters | null;
    isLoading: boolean;
}

export const defaultState: FieldState = {
    selectedImageParameters: null,
    isLoading: false,
};

export enum FIELD_ACTION_TYPE {
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_SELECTED_IMAGE_PARAMETERS = "SET_SELECTED_IMAGE_PARAMETERS",
}
