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
    assetWrapper: css({
        width: tokens.contentWidthFull,
        marginBottom: tokens.spacingM,
    }),
    image: css({
        height: 200,
        width: tokens.contentWidthFull,

        "&:hover": {
            borderColor: tokens.colorPrimary,
        },
    }),
};
