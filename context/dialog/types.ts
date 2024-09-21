import { LibraryTreeNode, AlbumPageNode } from "@/services/api";

export type DialogAction =
    | { type: DIALOG_ACTION_TYPE.TOGGLE_NODE; payload: string }
    | { type: DIALOG_ACTION_TYPE.SET_IS_LOADING; payload: boolean }
    | { type: DIALOG_ACTION_TYPE.SET_LIBRARY_TREE_DATA; payload: LibraryTreeNode[] }
    | {
          type: DIALOG_ACTION_TYPE.SET_ALBUM_DETAILS;
          payload: { albumId: string; albumDetails: AlbumPageNode[] };
      }
    | {
          type: DIALOG_ACTION_TYPE.SET_ALBUM_LOADING;
          payload: {
              albumId: string;
              isLoading: boolean;
          };
      }
    | { type: DIALOG_ACTION_TYPE.SET_CURRENT_PAGE; payload: number }
    | {
          type: DIALOG_ACTION_TYPE.SET_ASSETS_TO_SHOW;
          payload: {
              albumId: string;
              startIndex: number;
              endIndex: number;
          };
      }
    | { type: DIALOG_ACTION_TYPE.SET_ITEMS_PER_PAGE; payload: number };

export interface DialogState {
    libraryTreeData: LibraryTreeNode[];
    isLoading: boolean;
    expandedTreeNodes: Record<string, boolean>;
    albumDetails: Record<string, AlbumPageNode[]>;
    albumLoading: Record<string, boolean>;
    assetsToShow: Record<string, AlbumPageNode[]>;
    currentPage: number;
    itemsPerPage: number;
}

export const defaultState: DialogState = {
    libraryTreeData: [],
    isLoading: false,
    expandedTreeNodes: {},
    albumDetails: {},
    albumLoading: {},
    currentPage: 0,
    assetsToShow: {},
    itemsPerPage: 10,
};

export enum DIALOG_ACTION_TYPE {
    TOGGLE_NODE = "TOGGLE_NODE",
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_LIBRARY_TREE_DATA = "SET_LIBRARY_TREE_DATA",
    SET_ALBUM_LOADING = "SET_ALBUM_LOADING",
    SET_ALBUM_DETAILS = "SET_ALBUM_DETAILS",
    SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
    SET_ASSETS_TO_SHOW = "SET_ASSETS_TO_SHOW",
    SET_ITEMS_PER_PAGE = "SET_ITEMS_PER_PAGE",
}
