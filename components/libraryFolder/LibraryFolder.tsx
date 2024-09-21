import React, { useCallback } from "react";
import { Badge } from "@contentful/f36-components";
import { FolderIcon } from "@contentful/f36-icons";
import { NavList } from "@contentful/f36-navlist";

import { styles } from "./LibraryFolder.style";
import { LibraryNode } from "@/components/libraryNode/LibraryNode";
import { NestedLibraryNodes } from "@/components/nestedLibraryNodes/NestedLibraryNodes";
import { DIALOG_ACTION_TYPE } from "@/context/dialog/types";
import { useDialogContext } from "@/context/dialog/useDialogContext";
import { LibraryTreeFolder } from "@/services/api";

interface LibraryFolderProps {
    node: LibraryTreeFolder;
}

export const LibraryFolder: React.FC<LibraryFolderProps> = ({ node }) => {
    const { state, dispatch } = useDialogContext();

    const isExpanded = state.expandedTreeNodes[node.id] || false;

    const handleFolderClick = useCallback(() => {
        dispatch({ type: DIALOG_ACTION_TYPE.TOGGLE_NODE, payload: node.id });
    }, [dispatch, node]);

    return (
        <NavList.Item key={node.id} className={styles.navlistItem} as="div">
            <LibraryNode
                node={node}
                badge={
                    <Badge
                        size="small"
                        variant="warning"
                        startIcon={<FolderIcon type="plaintext" />}>
                        Folder
                    </Badge>
                }
                onClickHandler={handleFolderClick}
            />
            {node.children && node.children.length !== 0 && isExpanded && (
                <NavList className={styles.treeList}>
                    {node.children.map(childNode => (
                        <NestedLibraryNodes key={childNode.id} node={childNode} />
                    ))}
                </NavList>
            )}
        </NavList.Item>
    );
};
