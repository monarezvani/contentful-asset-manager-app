import React from "react";
import { LibraryTreeNode } from "@/services/api";
import { LibraryFolder } from "@/components/libraryFolder/LibraryFolder";
import { LibraryAlbum } from "@/components/libraryAlbum/LibraryAlbum";


interface NestedLibraryNodesProps {
    node: LibraryTreeNode;
}

export const NestedLibraryNodes: React.FC<NestedLibraryNodesProps> = ({ node }) => {
    if (node.scheme === "folder") {
        return <LibraryFolder node={node} />;
    } else if (node.scheme === "album") {
        return <LibraryAlbum node={node} />;
    }

    return null;
};
