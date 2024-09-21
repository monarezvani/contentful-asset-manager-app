"use client";

import React, {  useCallback, useEffect, useState } from "react";
import { ConfigAppSDK } from "@contentful/app-sdk";
import {
    Flex,
    Form,
    FormControl,
    Heading,
    TextInput,
} from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";
import { getAuthToken } from "@/services/api";
import { styles } from "./ConfigScreen.styles";

interface TokenParameters {
    accessToken: string;
    tokenExpirationDate: number;
}

export interface AppInstallationParameters {
    AppId: string;
    AppSecret: string;
    tokenParameters: TokenParameters;
}

export const ConfigScreen = () => {
    const [parameters, setParameters] = useState<AppInstallationParameters>({
        AppId: "",
        AppSecret: "",
        tokenParameters: {
            accessToken: "",
            tokenExpirationDate: 0,
        },
    });
    const sdk = useSDK<ConfigAppSDK>();

    const onConfigure = useCallback(async () => {
        const { accessToken, validUntil } = await getAuthToken(
            parameters.AppId,
            parameters.AppSecret
        );
        const currentState = await sdk.app.getCurrentState();

        return {
            parameters: {
                ...parameters,
                tokenParameters: {
                    accessToken,
                    tokenExpirationDate: validUntil,
                },
            },
            targetState: currentState,
        };
    }, [parameters, sdk]);

    useEffect(() => {
        sdk.app.onConfigure(() => onConfigure());
    }, [sdk, onConfigure]);

    useEffect(() => {
        (async () => {
            const currentParameters: AppInstallationParameters | null =
                await sdk.app.getParameters();

            if (currentParameters) {
                setParameters(currentParameters);
            }

            sdk.app.setReady();
        })();
    }, [sdk]);

    return (
        <>
            <div className={styles.background} />
            <Flex className={styles.body}>
                <hr className={styles.splitter} />
                <Heading className={styles.spaced}>Configuration</Heading>
                <Form>
                    <FormControl isRequired>
                        <FormControl.Label> APP ID</FormControl.Label>
                        <TextInput
                            value={parameters.AppId}
                            onChange={e =>
                                setParameters({
                                    ...parameters,
                                    AppId: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label> App Secret</FormControl.Label>
                        <TextInput
                            type="password"
                            value={parameters.AppSecret}
                            onChange={e =>
                                setParameters({
                                    ...parameters,
                                    AppSecret: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                </Form>
            </Flex>
        </>
    );
};
