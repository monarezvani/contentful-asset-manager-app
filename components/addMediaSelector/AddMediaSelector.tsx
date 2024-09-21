import React, { useMemo } from "react";
import { Button, Flex, Menu, Text } from "@contentful/f36-components";
import { ChevronDownIcon, PlusIcon } from "@contentful/f36-icons";
import { AddMediaMenuItem } from "@/locations/field/types";
import { styles } from "./AddMediaSelector.style";
import { useAddMedia } from "@/hooks/useAddMedia";
import { useAddExistingMedia } from "@/hooks/useAddExistingMedia";
import { useAddNewMedia } from "@/hooks/useAddNewMedia";

export const AddMediaSelector = () => {
    const { addExistingMediaHandler } = useAddExistingMedia();
    const { addMediaHandler } = useAddMedia();
    const { addNewMediaHandler } = useAddNewMedia();

    const addMediaMenuItems: AddMediaMenuItem[] = useMemo(() => {
        return [
            { id: 1, title: "Add existing media", clickHandler: addExistingMediaHandler },
            { id: 2, title: "Add new media", clickHandler: addNewMediaHandler },
            { id: 3, title: "Add media from ", clickHandler: addMediaHandler },
        ];
    }, [addMediaHandler, addExistingMediaHandler, addNewMediaHandler]);

    return (
        <Menu placement="bottom-start">
            <Menu.Trigger>
                <Button className={styles.addMediaButton}>
                    <Flex alignItems="center">
                        <PlusIcon variant="secondary" className={styles.addIcon} />
                        <Text className={styles.addMediaTitle}>Add media</Text>
                        <ChevronDownIcon variant="secondary" className={styles.arrowDownIcon} />
                    </Flex>
                </Button>
            </Menu.Trigger>
            <Menu.List>
                {addMediaMenuItems.map(menuItem => (
                    <Menu.Item key={menuItem.id} onClick={menuItem.clickHandler}>
                        {menuItem.title}
                    </Menu.Item>
                ))}
            </Menu.List>
        </Menu>
    );
};
