import { useCallback } from "react";

export const useDownloadAsset = () => {
    const downloadAssetHandler = useCallback((url: string) => {
        window.open(url, "_blank");
    }, []);

    return { downloadAssetHandler };
};
