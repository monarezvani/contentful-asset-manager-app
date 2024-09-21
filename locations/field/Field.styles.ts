import { css } from "emotion";
import tokens from "@contentful/f36-tokens";

export const styles = {
    bodyWhenImageSelected: css({
        height: "23rem",
        justifyContent: "flex-start",
        cursor: "none",
    }),
    bodyWhenNoImageSelected: css({
        height: "13rem",
        justifyContent: "center",
        border: `1px dashed ${tokens.gray500}`,
        borderRadius: tokens.borderRadiusMedium,
        alignItems: "flex-start",
        padding: tokens.spacingXl,
        position: "relative",
    }),
};
