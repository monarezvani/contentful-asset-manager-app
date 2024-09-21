export const calculateAssetSize = (assetSize: string) => {
    if (Number(assetSize) / 1000 < 1000) {
        return `${(Number(`${assetSize}`) / 1000).toFixed(2)} KB`;
    } else {
        return `${(Number(`${assetSize}`) / (1000 * 1000)).toFixed(2)} MB`;
    }
};
