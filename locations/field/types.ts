import { AssetStatus } from "@contentful/f36-components";

export interface AddMediaMenuItem {
    id: number;
    title: string;
    clickHandler: () => void;
}

export interface ImageParameters {
    url: string | undefined;
    title: string | undefined;
    status: AssetStatus | undefined;
    id: string;
    details: {
        dimension: string | null;
        size: string;
        fileName: string | undefined;
        type: string | undefined;
    };
}

export interface AssetFileDetailsMenuItems {
    id: number;
    title: string;
    content: string | undefined;
}

export type Asset = {
    sys: {
        id: string;
        type: string;
        version: number;
        publishedVersion?: number;
        archivedVersion?: number;
    };
    fields: {
        title?: {
            de?: string;
        };
        file?: {
            de?: {
                url: string;
                fileName: string;
                contentType: string;
                details: {
                    size: number;
                    image?: {
                        width: number;
                        height: number;
                    };
                };
            };
        };
    };
};
