import { css } from "emotion";
import tokens from "@contentful/f36-tokens";

export const styles = {
    body: css({
        padding: `${tokens.spacingXl} ${tokens.spacing2Xl} `,
        color: tokens.gray400,
        fontSize: tokens.fontSizeM,
        lineHeight: tokens.lineHeightCondensed,
        width: tokens.contentWidthFull,
    }),

    treeList: css({
        width: tokens.contentWidthFull,
    }),
    header: css({
        padding: ` ${tokens.spacingM} ${tokens.spacing3Xl}`,
        borderRadius: `${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium}  0 0`,
        borderBottom: `1px solid ${tokens.gray200}`,
    }),
    title: css({
        fontWeight: tokens.fontWeightDemiBold,
        color: tokens.gray800,
        fontSize: tokens.spacingM,
        lineHeight: tokens.spacingL,
        letterSpacing: tokens.letterSpacingDefault,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: tokens.contentWidthFull,
        margin: 0,
    }),
};
