import { AssetStatus } from "@contentful/f36-components";
import { Asset } from "@/locations/field/types";

export const checkAssetStatus = (asset: Asset): AssetStatus => {
    if (asset) {
        const isPublished =
            !!asset.sys.publishedVersion && asset.sys.version == asset.sys.publishedVersion + 1;

        const isChanged =
            !!asset.sys.publishedVersion && asset.sys.version >= asset.sys.publishedVersion + 2;

        const isArchived = !!asset.sys.archivedVersion;

        if (isPublished) {
            return "published";
        }

        if (isChanged) {
            return "changed";
        }

        if (isArchived) {
            return "archived";
        }

        return "draft";
    }

    return "draft";
};
