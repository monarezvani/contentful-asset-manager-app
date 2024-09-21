import { FIELD_ACTION_TYPE } from "@/context/field/types";
import { useFieldContext } from "@/context/field/useFieldContext";
import { useContentField } from "@/utils/useContentField";
import { useCallback } from "react";


export const useRemoveAsset = () => {
    const { contentField, sdk } = useContentField();
    const { dispatch } = useFieldContext();

    const removeAssetHandler = useCallback(() => {
        sdk.field.removeValue();

        dispatch({ type: FIELD_ACTION_TYPE.SET_SELECTED_IMAGE_PARAMETERS, payload: null });

        contentField?.getValue();
    }, [contentField, dispatch, sdk.field]);

    return {
        removeAssetHandler,
    };
};
