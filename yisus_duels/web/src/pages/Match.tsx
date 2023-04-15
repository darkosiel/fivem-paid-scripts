import styled from "@emotion/styled";
import { Flex } from "@mantine/core";
import React, { FC, useEffect } from "react";
import { useGlobalStore } from "../states/useGlobalState";
import { fetchNui } from "../utils/fetchNui";

const MatchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding-top: 10px;
    animation: fadeIn ease 1s;

    @keyframes fadeIn {
        0% { opacity:0; }
        100% { opacity:1; }
    }
`

const MatchTeam = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-width: 1.25vw;
    min-height: 2vh;
    padding: 10px 10px 10px 10px;
    background-color: var(--primary-color);
    font-size: 1.25rem;
    border-radius: 10px;
`

const MatchCounter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 4vw;
    background-color: var(--ingame-counter);
    padding: 10px 10px 10px 10px;
    border-radius: 10px;
`

const TimerDiv = styled.div`
    font-size: 1.88rem;
`

export const Match: FC = () => {
    const messages = useGlobalStore(state => state.messages);
    const match = useGlobalStore(state => state.match);
    const [timer, setTimer] = React.useState(match?.timer || 300);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            const newTime = timer - 1;
            setTimer(newTime);
            if (newTime <= 0) {
                fetchNui('matchTimerFinished', {})
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timer]);


    return (
        <MatchContainer>
            <Flex justify="center" align="center" gap='0.18vw' style={{ height: '100%', width: '100%' }}>
                <MatchTeam style={{
                    backgroundColor: 'var(--team1-ingame-color)'
                }}>{match?.team1 || 0}</MatchTeam>
                <MatchCounter>
                    <TimerDiv>{Math.floor(timer / 60)}:{timer % 60}</TimerDiv>
                    <div>{messages['nui.match.round']} {match?.round}</div>
                </MatchCounter>
                <MatchTeam style={{
                    backgroundColor: 'var(--team2-ingame-color)'
                }}>{match?.team2 || 0}</MatchTeam>
            </Flex>
        </MatchContainer>
    )
}