"use client";

import { GlobalStyles } from "@contentful/f36-components";
import { SDKProvider } from "@contentful/react-apps-toolkit";

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <SDKProvider>
            <GlobalStyles />
            {children}
        </SDKProvider>
    );
};
