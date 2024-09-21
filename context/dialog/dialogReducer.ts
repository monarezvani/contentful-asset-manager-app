import { DIALOG_ACTION_TYPE, DialogAction, DialogState } from "./types";

export const dialogReducer = (state: DialogState, action: DialogAction): DialogState => {
    switch (action.type) {
        case DIALOG_ACTION_TYPE.TOGGLE_NODE: {
            return {
                ...state,
                expandedTreeNodes: {
                    ...state.expandedTreeNodes,
                    [action.payload]: !state.expandedTreeNodes[action.payload],
                },
            };
        }
        case DIALOG_ACTION_TYPE.SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            };
        }
        case DIALOG_ACTION_TYPE.SET_LIBRARY_TREE_DATA: {
            return {
                ...state,
                libraryTreeData: action.payload,
            };
        }
        case DIALOG_ACTION_TYPE.SET_ALBUM_DETAILS: {
            return {
                ...state,
                albumDetails: {
                    ...state.albumDetails,
                    [action.payload.albumId]: action.payload.albumDetails,
                },
            };
        }
        case DIALOG_ACTION_TYPE.SET_ALBUM_LOADING: {
            return {
                ...state,
                albumLoading: {
                    ...state.albumLoading,
                    [action.payload.albumId]: action.payload.isLoading,
                },
            };
        }
        case DIALOG_ACTION_TYPE.SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.payload };
        }
        case DIALOG_ACTION_TYPE.SET_ITEMS_PER_PAGE: {
            return {
                ...state,
                itemsPerPage: action.payload,
            };
        }
        case DIALOG_ACTION_TYPE.SET_ASSETS_TO_SHOW: {
            const albumDetails = state.albumDetails[action.payload.albumId] || [];
            return {
                ...state,
                assetsToShow: {
                    ...state.assetsToShow,
                    [action.payload.albumId]: albumDetails.slice(
                        action.payload.startIndex,
                        action.payload.endIndex
                    ),
                },
            };
        }
        default:
            return state;
    }
};
