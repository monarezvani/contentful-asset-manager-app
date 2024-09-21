import { useFetchAssetDetails } from "@/services/useFetchAssetDetails";
import { useContentField } from "@/utils/useContentField";
import { useCallback } from "react";


export const useAddMedia = () => {
    const { contentField, sdk } = useContentField();
    const { fetchAssetDetails } = useFetchAssetDetails();

    const addMediaHandler = useCallback(() => {
        sdk.dialogs
            .openCurrentApp({
                width: "large",
                allowHeightOverflow: false,
                position: "center",
                shouldCloseOnEscapePress: true,
                shouldCloseOnOverlayClick: true,
            })
            .then(assetReference => {
                if (assetReference && contentField) {
                    contentField.setValue(assetReference);
                    sdk.entry.save();
                    fetchAssetDetails(assetReference.sys.id);
                }
            });
    }, [contentField, fetchAssetDetails, sdk]);

    return {
        addMediaHandler,
    };
};
