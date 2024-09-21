import { useCallback } from "react";
import { Asset } from "@/locations/field/types";
import { useFetchAssetDetails } from "@/services/useFetchAssetDetails";
import { useContentField } from "@/utils/useContentField";


export const useAddExistingMedia = () => {
    const { contentField, sdk } = useContentField();
    const { fetchAssetDetails } = useFetchAssetDetails();

    const addExistingMediaHandler = useCallback(() => {
        sdk.dialogs.selectSingleAsset<Asset>().then(selectedAsset => {
            if (contentField && selectedAsset && selectedAsset.sys.id) {
                const assetReference = {
                    sys: {
                        linkType: "Asset",
                        type: "link",
                        id: selectedAsset.sys.id,
                    },
                };

                contentField.setValue(assetReference);
                sdk.entry.save();
                contentField.getValue();

                fetchAssetDetails(selectedAsset.sys.id);
            }
        });
    }, [contentField, fetchAssetDetails, sdk]);

    return {
        addExistingMediaHandler,
    };
};
