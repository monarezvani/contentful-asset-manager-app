import { useCallback } from "react";
import { DialogAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { getLibraryTree } from "@/services/api";
import { useDialogContext } from "@/context/dialog/useDialogContext";
import { DIALOG_ACTION_TYPE } from "@/context/dialog/types";

export const useFetchLibraryTreeData = () => {
    const { dispatch } = useDialogContext();
    const sdk = useSDK<DialogAppSDK>();

    const { accessToken } = sdk.parameters.installation.tokenParameters;

    const fetchLibraryTree = useCallback(async () => {
        try {
            dispatch({ type: DIALOG_ACTION_TYPE.SET_IS_LOADING, payload: true });

            const response = await getLibraryTree(accessToken);

            dispatch({ type: DIALOG_ACTION_TYPE.SET_LIBRARY_TREE_DATA, payload: response.results });
        } catch (error) {
            if (error && typeof error === "object" && "message" in error) {
                sdk.notifier.error(error.message as string);
            } else {
                sdk.notifier.error("An unknown error occurred.");
            }
        } finally {
            dispatch({ type: DIALOG_ACTION_TYPE.SET_IS_LOADING, payload: false });
        }
    }, [accessToken, dispatch, sdk]);

    return {
        fetchLibraryTree,
    };
};
