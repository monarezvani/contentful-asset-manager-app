import React, { useMemo } from "react";
import { AssetCard, Flex, MenuItem, Text } from "@contentful/f36-components";
import { AssetFileDetailsMenuItems } from "@/locations/field/types";
import { styles } from "./UploadedAsset.style";
import { useFieldContext } from "@/context/field/useFieldContext";
import { useDownloadAsset } from "@/hooks/useDownloadAsset";
import { useEditAsset } from "@/hooks/useEditAsset";
import { useRemoveAsset } from "@/hooks/useRemoveAsset";

export const UploadedAsset = () => {
    const { state } = useFieldContext();
    const { editAssetHandler } = useEditAsset();
    const { removeAssetHandler } = useRemoveAsset();
    const { downloadAssetHandler } = useDownloadAsset();

    const assetFileDetailsMenuItems: AssetFileDetailsMenuItems[] = useMemo(() => {
        return [
            {
                id: 1,
                title: "File Name:",
                content: state.selectedImageParameters?.details?.fileName,
            },
            { id: 2, title: "File Type:", content: state.selectedImageParameters?.details?.type },
            { id: 3, title: "Size:", content: state.selectedImageParameters?.details?.size },
        ];
    }, [state.selectedImageParameters]);

    return (
        <AssetCard
            src={state.selectedImageParameters?.url}
            title={state.selectedImageParameters?.title}
            status={state.selectedImageParameters?.status}
            className={styles.assetCard}
            onClick={() => editAssetHandler(state?.selectedImageParameters?.id ?? "0")}
            actions={[
                <MenuItem key="actions" className={styles.assetActionTitle}>
                    Actions
                </MenuItem>,
                <MenuItem
                    key="edit"
                    onClick={() => editAssetHandler(state?.selectedImageParameters?.id ?? "0")}>
                    Edit
                </MenuItem>,
                <MenuItem
                    key="download"
                    onClick={() => downloadAssetHandler(state.selectedImageParameters?.url ?? "")}>
                    Download
                </MenuItem>,
                <MenuItem key="remove" onClick={removeAssetHandler}>
                    Remove
                </MenuItem>,
                <MenuItem key="File Info" className={styles.assetActionTitle}>
                    File Info
                </MenuItem>,
                <MenuItem key="fileDetails" className={styles.assetDetailsContainer}>
                    <Flex
                        flexDirection="column"
                        alignItems="start"
                        className={styles.assetDetailsWrapper}>
                        {assetFileDetailsMenuItems.map(fileDetails => (
                            <Flex key={fileDetails.id}>
                                <Text className={styles.assetDetailsMenuItemTitle}>
                                    {fileDetails.title}
                                </Text>
                                <Text className={styles.assetDetailsMenuItem}>
                                    {fileDetails?.content}
                                </Text>
                            </Flex>
                        ))}
                        {state.selectedImageParameters?.details?.dimension && (
                            <Flex>
                                <Text className={styles.assetDetailsMenuItemTitle}>Dimensions</Text>
                                <Text className={styles.assetDetailsMenuItem}>
                                    {state.selectedImageParameters?.details?.dimension}
                                </Text>
                            </Flex>
                        )}
                    </Flex>
                </MenuItem>,
            ]}
        />
    );
};
