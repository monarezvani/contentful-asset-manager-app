import React from "react";
import { EntryCard, IconButton } from "@contentful/f36-components";
import { MinusIcon, PlusIcon } from "@contentful/f36-icons";
import { LibraryTreeAlbum, LibraryTreeNode } from "@/services/api";
import { styles } from "./LibraryNode.style";
import { useDialogContext } from "@/context/dialog/useDialogContext";

interface LibraryNodeProps {
    node: LibraryTreeNode | LibraryTreeAlbum;
    badge: React.ReactNode;
    onClickHandler: () => void;
}

export const LibraryNode: React.FC<LibraryNodeProps> = ({ node, badge, onClickHandler }) => {
    const { state } = useDialogContext();
    const isExpanded = state.expandedTreeNodes[node.id] || false;

    return (
        <EntryCard
            title={node.name}
            badge={badge}
            className={styles.spacing}
            onClick={onClickHandler}
            customActionButton={
                Number(node.size) !== 0 && (
                    <IconButton
                        aria-label="Actions"
                        icon={
                            isExpanded ? (
                                <MinusIcon variant="muted" />
                            ) : (
                                <PlusIcon variant="muted" />
                            )
                        }
                        size="small"
                        variant="transparent"
                        onClick={onClickHandler}
                    />
                )
            }
        />
    );
};
