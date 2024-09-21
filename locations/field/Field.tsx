import React, { useEffect } from "react";
import clsx from "clsx";
import { Flex } from "@contentful/f36-components";
import { styles } from "./Field.styles";
import { AddMediaSelector } from "@/components/addMediaSelector/AddMediaSelector";
import Loading from "@/components/loading/Loading";
import { UploadedAsset } from "@/components/uploadedAsset/UploadedAsset";
import { useFieldContext } from "@/context/field/useFieldContext";
import { useFetchAssetDetails } from "@/services/useFetchAssetDetails";
import { useContentField } from "@/utils/useContentField";

export const Field = () => {
    const { contentField, sdk } = useContentField();
    const { state } = useFieldContext();
    const { fetchAssetDetails } = useFetchAssetDetails();

    useEffect(() => {
        sdk.window.startAutoResizer();

        const fieldValue = contentField?.getValue();

        if (fieldValue && fieldValue.sys !== undefined) {
            fetchAssetDetails(contentField?.getValue()?.sys?.id);
        }
    }, [sdk, contentField, fetchAssetDetails]);

    return (
        <React.Fragment>
            {state.isLoading ? (
                <Loading />
            ) : (
                <Flex
                    className={clsx({
                        [styles.bodyWhenImageSelected]: state.selectedImageParameters,
                        [styles.bodyWhenNoImageSelected]: !state.selectedImageParameters,
                    })}>
                    {state.selectedImageParameters && state.selectedImageParameters.id ? (
                        <UploadedAsset />
                    ) : (
                        <AddMediaSelector />
                    )}
                </Flex>
            )}
        </React.Fragment>
    );
};
