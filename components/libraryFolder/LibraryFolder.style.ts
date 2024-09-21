import { css } from "emotion";
import tokens from "@contentful/f36-tokens";

export const styles = {
    navlistItem: css({
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: `0 0 0 ${tokens.spacingM}`,
    }),
    treeList: css({
        width: tokens.contentWidthFull,
    }),
};
