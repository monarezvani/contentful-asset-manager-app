import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";

export const useContentField = () => {
    const sdk = useSDK<FieldAppSDK>();

    const contentField = sdk.entry.fields["image"];
    return {
        contentField,
        sdk,
    };
};
