import styled from "@emotion/styled";
import { Flex, Text } from "@mantine/core";
import React from "react";
import { useState, useEffect, FC } from "react";

const CounterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    width: 10vh;
    height: 10vh;
    background-color: var(--ingame-counter);
    border-radius: 50%;
`;

type MatchCountdownProps = {
    countdown?: number;
    onFinish: () => void;
}

export const MatchCountdown: FC<MatchCountdownProps> = (props) => {
    const [countdown, setCountdown] = useState(props.countdown || 10);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000);
        if (countdown === 0) {
            clearInterval(intervalId);
            props.onFinish();
        }
        return () => clearInterval(intervalId);
    }, [countdown]);

    return (
        <Flex
            justify={'center'}
            align={'center'}
            sx={{
                height: '100vh',
            }}
        >
            <CounterContainer>
                <Text size={'2rem'}>{countdown}</Text>
            </CounterContainer>
        </Flex>
    );
}