"use server";

interface AuthToken {
    accessToken: string;
    validUntil: number;
}

// Please only execute this function on click, never automatically.
// If the token is outdated, promt the user a button to refresh the token - this button will execute this logic and save the new token.
export const getAuthToken = async (appId: string, appSecret: string): Promise<AuthToken> => {
    const url = `https://basURL_id=${appId}&app_secret=${appSecret}&grant_type=client_credentials`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to get auth token: ${response.statusText}`);
    }

    const data = await response.json();

    return {
        accessToken: data.access_token,
        validUntil: new Date().getTime() + parseInt(data.expires_in, 10) * 1000,
    };
};

export type LibraryTreeNode = LibraryTreeFolder | LibraryTreeAlbum;

export interface LibraryTreeFolder {
    id: string;
    name: string;
    namePath: string;
    scheme: "folder";
    size: string;
    url: {
        detail: string;
    };
    children: LibraryTreeNode[];
}

export interface LibraryTreeAlbumNode {
    height: string;
    ownerName: string;
    dpi: string;
    namePath: string;
    idPath: string;
    created: string;
    url: {
        preview: string;
        detail: string;
    };
    name: string;
    id: string;
    size: string;
    scheme: string;
    owner: string;
    time: string;
    width: string;
}

export interface LibraryTreeAlbum {
    id: string;
    name: string;
    namePath: string;
    scheme: "album";
    width: string;
    height: string;
    size: string;
    url: {
        preview: string;
        detail: string;
    };
    children: LibraryTreeAlbumNode[];
}

export interface LibraryTree {
    results: LibraryTreeNode[];
}

export const getLibraryTree = async (accessToken: string): Promise<LibraryTree> => {
    const url = "BaseURL?sortBy=time&sortDirection=ascending";

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to get library tree: ${response.statusText}`);
    }

    return await response.json();
};

export interface AlbumPage {
    results: AlbumPageNode[];
    start: number;
    found: number;
    limit: number;
}

export interface AlbumPageNode {
    id: string;
    name: string;
    description: string;
    md5: string;
    width: string;
    height: string;
    size: string;
    url: {
        preview: string;
        download: string;
        directUrlOriginal: string;
        directUrlPreview: string;
    };
    default: {
        Copyright: string;
        "Content Type": string;
    };
}

export const getAlbumPage = async (
    id: string,
    page: number = 0,
    accessToken: string
): Promise<AlbumPage> => {
    const url = `baseURL/album/${id}?start=${page}&limit=100`;

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to get library tree: ${response.statusText}`);
    }

    return await response.json();
};
