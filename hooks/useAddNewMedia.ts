import { useCallback } from "react";
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { useFetchAssetDetails } from "@/services/useFetchAssetDetails";

export const useAddNewMedia = () => {
    const sdk = useSDK<FieldAppSDK>();
    const { fetchAssetDetails } = useFetchAssetDetails();

    const addNewMediaHandler = useCallback(async () => {
        sdk.navigator.openNewAsset({ slideIn: { waitForClose: true } }).then(asset => {
            if (asset.entity?.sys.id) {
                fetchAssetDetails(asset.entity?.sys.id);
            }
        });
    }, [fetchAssetDetails, sdk.navigator]);

    return { addNewMediaHandler };
};
