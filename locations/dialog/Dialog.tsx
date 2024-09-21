import React, { useCallback, useEffect } from "react";
import { DialogAppSDK } from "@contentful/app-sdk";
import { Flex, Heading, IconButton } from "@contentful/f36-components";
import { CloseIcon } from "@contentful/f36-icons";
import { NavList } from "@contentful/f36-navlist";
import { useSDK } from "@contentful/react-apps-toolkit";
import { styles } from "./Dialog.style";
import { useDialogContext } from "@/context/dialog/useDialogContext";
import { useFetchLibraryTreeData } from "@/services/useFetchLibraryTreeData";
import Loading from "@/components/loading/Loading";
import { NestedLibraryNodes } from "@/components/nestedLibraryNodes/NestedLibraryNodes";

export const Dialog = () => {
    const sdk = useSDK<DialogAppSDK>();
    const { state } = useDialogContext();

    const { fetchLibraryTree } = useFetchLibraryTreeData();

    useEffect(() => {
        fetchLibraryTree();
    }, [fetchLibraryTree]);

    useEffect(() => {
        sdk.window.startAutoResizer();

        return sdk.window.stopAutoResizer;
    }, [sdk]);

    const closeDialogHandler = useCallback(() => {
        sdk.close();
    }, [sdk]);

    return (
        <React.Fragment>
            {state.isLoading ? (
                <Loading />
            ) : (
                <React.Fragment>
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        className={styles.header}>
                        <Heading className={styles.title}>Add media from </Heading>
                        <IconButton
                            variant="transparent"
                            aria-label="close"
                            icon={<CloseIcon />}
                            onClick={closeDialogHandler}
                        />
                    </Flex>
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
