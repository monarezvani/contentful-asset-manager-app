import { useCallback } from "react";
import { DialogAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { getAlbumPage } from "@/services/api";
import { useDialogContext } from "@/context/dialog/useDialogContext";
import { DIALOG_ACTION_TYPE } from "@/context/dialog/types";

export const useFetchAlbumDetails = () => {
    const sdk = useSDK<DialogAppSDK>();
    const { dispatch } = useDialogContext();

    const { accessToken } = sdk.parameters.installation.tokenParameters;

    const fetchAlbumDetails = useCallback(
        async (albumId: string) => {
            try {
                dispatch({
                    type: DIALOG_ACTION_TYPE.SET_ALBUM_LOADING,
                    payload: { albumId, isLoading: true },
                });

                const response = await getAlbumPage(albumId, 1, accessToken);
                const details = response.results;

                dispatch({
                    type: DIALOG_ACTION_TYPE.SET_ALBUM_DETAILS,
                    payload: { albumId, albumDetails: details },
                });

                return response.results;
            } catch (error) {
                if (error && typeof error === "object" && "message" in error) {
                    sdk.notifier.error(error.message as string);
                } else {
                    sdk.notifier.error("An unknown error occurred.");
                }

                return [];
            } finally {
                dispatch({
                    type: DIALOG_ACTION_TYPE.SET_ALBUM_LOADING,
                    payload: { albumId, isLoading: false },
                });
            }
        },
        [accessToken, dispatch, sdk.notifier]
    );

    return { fetchAlbumDetails };
};
