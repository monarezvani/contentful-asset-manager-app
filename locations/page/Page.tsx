import React, { useEffect } from "react";
import { Heading } from "@contentful/f36-components";
import { NavList } from "@contentful/f36-navlist";
import { styles } from "./Page.style";
import Loading from "@/components/loading/Loading";
import { NestedLibraryNodes } from "@/components/nestedLibraryNodes/NestedLibraryNodes";
import { useDialogContext } from "@/context/dialog/useDialogContext";
import { useFetchLibraryTreeData } from "@/services/useFetchLibraryTreeData";

export const AppPage = () => {
    const { state } = useDialogContext();
    const { fetchLibraryTree } = useFetchLibraryTreeData();

    useEffect(() => {
        fetchLibraryTree();
    }, [fetchLibraryTree]);

    return (
        <React.Fragment>
            {state.isLoading ? (
                <Loading />
            ) : (
                <React.Fragment>
                    <div className={styles.header}>
                        <Heading className={styles.title}> Media</Heading>
                    </div>
                    <div className={styles.body}>
                        <NavList className={styles.treeList}>
                            {state.libraryTreeData.map(node => (
                                <NestedLibraryNodes node={node} key={node.id} />
                            ))}
                        </NavList>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
