import { useCallback } from "react";
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FIELD_ACTION_TYPE } from "@/context/field/types";
import { useFieldContext } from "@/context/field/useFieldContext";
import { calculateAssetSize } from "@/utils/calculateAssetSize";
import { checkAssetStatus } from "@/utils/checkAssetStatus";


export const useFetchAssetDetails = () => {
    const sdk = useSDK<FieldAppSDK>();
    const { dispatch } = useFieldContext();

    const fetchAssetDetails = useCallback(
        async (assetId: string) => {
            try {
                dispatch({ type: FIELD_ACTION_TYPE.SET_IS_LOADING, payload: true });

                const asset = await sdk.cma.asset.get({ assetId });

                const status = checkAssetStatus(asset);
                const size = calculateAssetSize(asset.fields.file?.de?.details?.size);

                const file = asset?.fields?.file?.de;
                const url = file?.url;
                const title = asset.fields?.title?.de;
                const fileName = file?.fileName;
                const type = file?.contentType;
                const width = file?.details?.image?.width;
                const height = file?.details?.image?.height;
                const dimension = width ? `${width} \u00D7 ${height}` : null;

                return dispatch({
                    type: FIELD_ACTION_TYPE.SET_SELECTED_IMAGE_PARAMETERS,
                    payload: {
                        url,
                        title,
                        status,
                        id: asset.sys.id,
                        details: {
                            dimension,
                            fileName,
                            size,
                            type,
                        },
                    },
                });
            } catch (error) {
                if (error && typeof error === "object" && "message" in error) {
                    sdk.notifier.error(error.message as string);
                } else {
                    sdk.notifier.error("An unknown error occurred.");
                }

                sdk.field.removeValue();
                dispatch({
                    type: FIELD_ACTION_TYPE.SET_SELECTED_IMAGE_PARAMETERS,
                    payload: null,
                });
            } finally {
                dispatch({ type: FIELD_ACTION_TYPE.SET_IS_LOADING, payload: false });
            }
        },
        [dispatch, sdk]
    );

    return { fetchAssetDetails };
};
