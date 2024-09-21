import { useCallback } from "react";
import { useRemoveAsset } from "./useRemoveAsset";
import { useFetchAssetDetails } from "@/services/useFetchAssetDetails";
import { useContentField } from "@/utils/useContentField";

export const useEditAsset = () => {
    const { sdk } = useContentField();

    const { fetchAssetDetails } = useFetchAssetDetails();
    const { removeAssetHandler } = useRemoveAsset();

    const editAssetHandler = useCallback(
        (assetId: string) => {
            sdk.navigator.openAsset(assetId, { slideIn: { waitForClose: true } }).then(asset => {
                if (asset.entity?.sys.id) {
                    fetchAssetDetails(asset.entity?.sys.id);
                } else {
                    removeAssetHandler();
                }
            });
        },
        [fetchAssetDetails, removeAssetHandler, sdk.navigator]
    );

    return { editAssetHandler };
};
