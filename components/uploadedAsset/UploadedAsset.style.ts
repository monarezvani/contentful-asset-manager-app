import { css } from "emotion";
import tokens from "@contentful/f36-tokens";

export const styles = {
    assetCard: css({
        cursor: "pointer",

        "&:hover": {
            borderColor: tokens.colorPrimary,
        },
    }),
    assetActionTitle: css({
        fontWeight: tokens.fontWeightNormal,
        fontSize: tokens.fontSizeS,
        letterSpacing: tokens.letterSpacingWide,
        color: tokens.gray500,
        textAlign: "left",
        padding: `${tokens.spacingXs} ${tokens.spacingS} ${tokens.spacing2Xs}`,
        lineHeight: tokens.lineHeightL,
        cursor: "none",
        pointerEvents: "none",
    }),
    assetDetailsContainer: css({
        margin: `0 ${tokens.spacing2Xs}`,
        padding: ` ${tokens.spacingXs}`,
        cursor: "none",
        pointerEvents: "none",
    }),
    assetDetailsWrapper: css({
        backgroundColor: tokens.gray100,
        borderRadius: tokens.borderRadiusMedium,
        padding: tokens.spacingXs,
        width: 200,
        overflow: "hidden",
    }),
    assetDetailsMenuItem: css({
        fontSize: tokens.fontSizeS,
        lineHeight: tokens.lineHeightCondensed,
        fontWeight: tokens.fontWeightNormal,
        padding: `${tokens.spacing2Xs} 0`,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: tokens.contentWidthDefault,
        float: "left",
        overflow: "hidden",
        alignSelf: "center",
        maxWidth: 120,
    }),
    assetDetailsMenuItemTitle: css({
        marginRight: tokens.spacingXs,
        whiteSpace: "nowrap",
        alignSelf: "center",
        fontSize: tokens.fontSizeS,
    }),
};
