import { css } from "emotion";
import tokens from "@contentful/f36-tokens";

export const styles = {
    header: css({
        padding: `${tokens.spacingS} ${tokens.spacingS} ${tokens.spacingS} ${tokens.spacingL}`,
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
    body: css({
        padding: `${tokens.spacingM} ${tokens.spacingM} ${tokens.spacingM} ${tokens.spacingXs}`,
        color: tokens.gray400,
        fontSize: tokens.fontSizeM,
        lineHeight: tokens.lineHeightDefault,
    }),
    treeList: css({
        width: tokens.contentWidthFull,
    }),
};
