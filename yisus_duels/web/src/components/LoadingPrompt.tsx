import { Flex, Loader, Text } from "@mantine/core";
import React, { FC } from "react";
import { useGlobalStore } from "../states/useGlobalState";

export const LoadingPrompt: FC = () => {
    const messages = useGlobalStore(state => state.messages);
    return (
        <Flex
            justify={'center'}
            align={'center'}
            sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                height: '100vh',
            }}
        >
            <Flex direction="column" align="center" gap={10}
            >
                <Loader size="xl" color='var(--alt-highlight-color)' variant="bars" />
                <Text>{messages['nui.prompt.message']}</Text>
            </Flex>
        </Flex>
    );
}