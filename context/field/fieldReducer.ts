import { FIELD_ACTION_TYPE, FielAction, FieldState } from "./types";

export const fieldReducer = (state: FieldState, action: FielAction): FieldState => {
    switch (action.type) {
        case FIELD_ACTION_TYPE.SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            };
        }
        case FIELD_ACTION_TYPE.SET_SELECTED_IMAGE_PARAMETERS: {
            return {
                ...state,
                selectedImageParameters: action.payload,
            };
        }
        default:
            return state;
    }
};
