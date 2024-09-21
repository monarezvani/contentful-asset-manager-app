import { useCallback } from "react";
import { DialogAppSDK } from "@contentful/app-sdk";
import { locations } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { DIALOG_ACTION_TYPE } from "@/context/dialog/types";
import { AlbumPageNode } from "@/services/api";
import { useDialogContext } from "@/context/dialog/useDialogContext";

export const usePublishAsset = () => {
    const sdk = useSDK<DialogAppSDK>();
    const { dispatch } = useDialogContext();

    const publishAsset = useCallback(
        async (asset: AlbumPageNode) => {
            try {
                dispatch({ type: DIALOG_ACTION_TYPE.SET_IS_LOADING, payload: true });

                const existingAssets = await sdk.cma.asset.getMany({
                    query: {
                        "fields.file.de.fileName": asset.name,
                    },
                });

                if (existingAssets.items.length > 0 && existingAssets.items[0]) {
                    const assetReference = {
                        sys: {
                            type: "Link",
                            linkType: "Asset",
                            id: existingAssets?.items[0].sys.id,
                        },
                    };

                    if (sdk.location.is(locations.LOCATION_PAGE)) {
                        sdk.notifier.warning("Asset is already exists in Contentful!");
                    } else if (sdk.location.is(locations.LOCATION_DIALOG)) {
                        sdk.close(assetReference);
                    }
                } else {
                    const assetData = {
                        fields: {
                            title: {
                                de: asset?.description?.substring(0, 80) ?? asset.name,
                            },
                            description: { de: asset.description },
                            file: {
                                de: {
                                    fileName: asset.name,
                                    contentType: asset.default["Content Type"],
                                    upload: asset.url.directUrlOriginal,
                                },
                            },
                        },
                    };

                    const createdAsset = await sdk.cma.asset.create({}, assetData);

                    const processedAsset = await sdk.cma.asset.processForAllLocales(
                        { assetId: createdAsset.sys.id },
                        createdAsset
                    );

                    const publishedAsset = await sdk.cma.asset.publish(
                        { assetId: processedAsset.sys.id },
                        processedAsset
                    );

                    const assetReference = {
                        sys: {
                            type: "Link",
                            linkType: "Asset",
                            id: publishedAsset.sys.id,
                        },
                    };

                    if (sdk.location.is(locations.LOCATION_DIALOG)) {
                        sdk.notifier.success("Asset added and published successfully!");
                        sdk.close(assetReference);
                    } else {
                        sdk.notifier.success("Asset published successfully!");
                    }
                }
            } catch (error) {
                if (error && typeof error === "object" && "message" in error) {
                    sdk.notifier.error(error.message as string);
                } else {
                    sdk.notifier.error("An unknown error occurred.");
                }
            } finally {
                dispatch({ type: DIALOG_ACTION_TYPE.SET_IS_LOADING, payload: false });

                if (sdk.location.is(locations.LOCATION_DIALOG)) {
                    sdk.close();
                }
            }
        },
        [dispatch, sdk]
    );

    return { publishAsset };
};
