import React, { useCallback, useMemo } from "react";
import { Pagination as F36Pagination } from "@contentful/f36-components";
import { styles } from "./Pagination.style";
import { useDialogContext } from "@/context/dialog/useDialogContext";
import { DIALOG_ACTION_TYPE } from "@/context/dialog/types";

interface PaginationProps {
    albumId: string;
}

export const Pagination: React.FC<PaginationProps> = ({ albumId }) => {
    const { state, dispatch } = useDialogContext();

    const isLastPage = useMemo(() => {
        return (
            state.currentPage ===
            Math.ceil((state.albumDetails[albumId]?.length ?? 0) / state.itemsPerPage) - 1
        );
    }, [albumId, state.albumDetails, state.currentPage, state.itemsPerPage]);

    const viewPerPageOptions = useMemo(() => {
        return (state.albumDetails[albumId]?.length ?? 0) <= 10
            ? [10]
            : (state.albumDetails[albumId]?.length ?? 0) <= 50
              ? [10, 50]
              : [10, 50, 100];
    }, [albumId, state.albumDetails]);

    const paginationHandler = useCallback(
        (page: number, albumId: string) => {
            const startIndex = page * state.itemsPerPage;
            const endIndex = startIndex + state.itemsPerPage;

            dispatch({ type: DIALOG_ACTION_TYPE.SET_CURRENT_PAGE, payload: page });
            dispatch({
                type: DIALOG_ACTION_TYPE.SET_ASSETS_TO_SHOW,
                payload: {
                    albumId,
                    startIndex,
                    endIndex,
                },
            });
        },
        [dispatch, state.itemsPerPage]
    );

    const handleViewPerPageChange = useCallback(
        (itemsViewCount: number, albumId: string) => {
            const page = Math.floor((state.itemsPerPage * state.currentPage + 1) / itemsViewCount);
            const startIndex = page * itemsViewCount;
            const endIndex = startIndex + itemsViewCount;

            dispatch({ type: DIALOG_ACTION_TYPE.SET_CURRENT_PAGE, payload: page });
            dispatch({ type: DIALOG_ACTION_TYPE.SET_ITEMS_PER_PAGE, payload: itemsViewCount });
            dispatch({
                type: DIALOG_ACTION_TYPE.SET_ASSETS_TO_SHOW,
                payload: {
                    albumId,
                    startIndex,
                    endIndex,
                },
            });
        },
        [dispatch, state.currentPage, state.itemsPerPage]
    );

    return (
        <F36Pagination
            className={styles.body}
            activePage={state.currentPage}
            onPageChange={page => paginationHandler(page, albumId)}
            itemsPerPage={state.itemsPerPage}
            totalItems={state.albumDetails[albumId]?.length ?? 0}
            showViewPerPage
            viewPerPageOptions={viewPerPageOptions}
            onViewPerPageChange={viewPageCount => handleViewPerPageChange(viewPageCount, albumId)}
            isLastPage={isLastPage}
        />
    );
};
