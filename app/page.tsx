"use client";

import { useMemo } from "react";
import { locations } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { ConfigScreen } from "@/locations/configureScreen/ConfigScreen";
import { DialogWrapper } from "@/locations/dialogWrapper/DialogWrapper";
import { FieldWrapper } from "@/locations/fieldWrapper/FieldWrapper";
import { PageWrapper } from "@/locations/pageWrapper/PageWrapper";


const ComponentLocationSettings = {
    [locations.LOCATION_APP_CONFIG]: ConfigScreen,
    [locations.LOCATION_ENTRY_FIELD]: FieldWrapper,
    [locations.LOCATION_DIALOG]: DialogWrapper,
    [locations.LOCATION_PAGE]: PageWrapper,
};

export default function Page(): React.ReactNode {
    const sdk = useSDK();

    const Component = useMemo(() => {
        for (const [location, component] of Object.entries(ComponentLocationSettings)) {
            if (sdk.location.is(location)) {
                return component;
            }
        }
    }, [sdk.location]);

    return Component ? <Component /> : null;
}
