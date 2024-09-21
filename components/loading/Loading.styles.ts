import { css } from "emotion";
import tokens from "@contentful/f36-tokens";

export const styles = {
    container: css({
        justifyContent: "center",
        alignItems: "center",
        margin: `${tokens.spacing2Xl} 0 ${tokens.spacing2Xl}`,
        width: tokens.contentWidthFull,
    }),
};
