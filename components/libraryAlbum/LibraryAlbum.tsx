import React, { useCallback } from "react";
import { AssetCard, AssetIcon, Badge, Grid, MenuItem } from "@contentful/f36-components";
import { NavList } from "@contentful/f36-navlist";
import { styles } from "./LibraryAlbum.style";
import { LibraryNode } from "@/components/libraryNode/LibraryNode";
import Loading from "@/components/loading/Loading";
import { DIALOG_ACTION_TYPE } from "@/context/dialog/types";
import { useDialogContext } from "@/context/dialog/useDialogContext";
import { useDownloadAsset } from "@/hooks/useDownloadAsset";
import { LibraryTreeAlbum } from "@/services/api";
import { useFetchAlbumDetails } from "@/services/useFetchAlbumDetails";
import { usePublishAsset } from "@/services/usePublishAsset";
import { Pagination } from "@/components/pagination/Pagination";

interface LibraryAlbumProps {
    node: LibraryTreeAlbum;
}

export const LibraryAlbum: React.FC<LibraryAlbumProps> = ({ node }) => {
    const { state, dispatch } = useDialogContext();

    const { fetchAlbumDetails } = useFetchAlbumDetails();
    const { publishAsset } = usePublishAsset();
    const { downloadAssetHandler } = useDownloadAsset();

    const isExpanded = state.expandedTreeNodes[node.id] || false;

    const clickAlbumHandler = useCallback(
        async (album: LibraryTreeAlbum) => {
            if (Number(album.size) !== 0) {
                const isExpanded = state.expandedTreeNodes[album.id] || false;

                if (!isExpanded && !state.albumDetails[album.id]) {
                    const albumDetails = await fetchAlbumDetails(album.id);

                    dispatch({
                        type: DIALOG_ACTION_TYPE.SET_ALBUM_DETAILS,
                        payload: { albumId: album.id, albumDetails },
                    });

                    dispatch({
                        type: DIALOG_ACTION_TYPE.SET_ASSETS_TO_SHOW,
                        payload: {
                            albumId: node.id,
                            startIndex: 0,
                            endIndex: state.itemsPerPage,
                        },
                    });
                }

                dispatch({ type: DIALOG_ACTION_TYPE.TOGGLE_NODE, payload: node.id });
            }
        },
        [
            dispatch,
            fetchAlbumDetails,
            node.id,
            state.albumDetails,
            state.expandedTreeNodes,
            state.itemsPerPage,
        ]
    );

    return (
        <NavList.Item key={node.id} className={styles.navlistItem}>
            <LibraryNode
                node={node}
                badge={
                    <Badge
                        size="small"
                        variant="primary"
                        startIcon={<AssetIcon type="plaintext" />}>
                        Album
                    </Badge>
                }
                onClickHandler={() => clickAlbumHandler(node)}
            />
            {state.albumLoading[node.id] ? (
                <Loading />
            ) : (
                <div className={styles.assetWrapper}>
                    {state.assetsToShow[node.id] && isExpanded && (
                        <>
                            <Pagination albumId={node.id} />
                            <Grid
                                rowGap="spacingS"
                                columnGap="spacingS"
                                columns="1fr 1fr 1fr 1fr"
                                marginBottom="spacingS">
                                {state.assetsToShow[node.id]?.map(asset => (
                                    <AssetCard
                                        className={styles.image}
                                        key={asset.id}
                                        type="image"
                                        src={asset.url.directUrlPreview}
                                        onClick={() => publishAsset(asset)}
                                        title={asset.description ?? asset.name}
                                        size="small"
                                        actions={[
                                            <MenuItem
                                                key="download"
                                                onClick={() =>
                                                    downloadAssetHandler(asset.url.download)
                                                }>
                                                Download
                                            </MenuItem>,
                                        ]}
                                    />
                                ))}
                            </Grid>
                        </>
                    )}
                </div>
            )}
        </NavList.Item>
    );
};
