import { css } from "emotion";
import tokens from "@contentful/f36-tokens";

export const styles = {
    background: css({
        display: "block",
        position: "absolute",
        zIndex: tokens.zIndexNegative,
        top: 0,
        width: tokens.contentWidthFull,
        height: 300,
        backgroundColor: tokens.blue300,
    }),
    body: css({
        flexDirection: "column",
        maxWidth: tokens.contentWidthText,
        height: "auto",
        minHeight: "65vh",
        margin: `${tokens.spacingXl} auto 0`,
        padding: `${tokens.spacingXl} ${tokens.spacing2Xl}`,
        backgroundColor: tokens.colorWhite,
        zIndex: tokens.zIndexDefault,
        boxShadow: tokens.boxShadowDefault,
        borderRadius: tokens.borderRadiusSmall,
    }),
    splitter: css({
        marginBottom: tokens.spacingL,
        border: 0,
        height: 1,
        backgroundColor: tokens.gray300,
        width: tokens.contentWidthFull,
    }),
    spaced: css({
        marginBottom: tokens.spacingL,
    }),
    logoContainer: css({
        justifyContent: "center",
        margin: `${tokens.spacing2Xl} 0 ${tokens.spacing4Xl}`,
    }),
    logo: css({
        fontSize: tokens.fontSizeS,
        lineHeight: tokens.lineHeightS,
    }),
};
