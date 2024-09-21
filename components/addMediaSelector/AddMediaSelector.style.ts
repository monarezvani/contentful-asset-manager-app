import { css } from "emotion";
import tokens from "@contentful/f36-tokens";

export const styles = {
    addMediaButton: css({
        fontWeight: "bold",
        position: "relative",
    }),
    addIcon: css({
        marginRight: tokens.spacing2Xs,
    }),
    addMediaTitle: css({
        display: "block",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontWeight: "bold",
    }),
    arrowDownIcon: css({
        marginLeft: tokens.spacing2Xs,
    }),
};
