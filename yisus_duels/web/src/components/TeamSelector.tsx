import styled from "@emotion/styled";
import { Button, Flex, Text } from "@mantine/core";
import React, { FC } from "react";
import { Player, useGlobalStore } from "../states/useGlobalState";
import { fetchNui } from "../utils/fetchNui";

const TeamContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const TeamHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 10px 10px 10px 10px;
    gap: 10vw;
`

type TeamSelectorProps = {
    lobbyId: number,
    team: number;
    name: string;
    players: Player[];
}

const isAlreadyInTeam = (playerId: number, players: Player[]) => {
    return players.some((player) => player.id === playerId);
}

export const TeamSelector: FC<TeamSelectorProps> = (props) => {
    const messages = useGlobalStore(state => state.messages);
    const currentPlayerId = useGlobalStore(state => state.currentPlayerId);

    const joinTeam = async () => {
        await fetchNui('joinTeam', { lobbyId: props.lobbyId, team: props.team });
    }

    return (
        <TeamContainer>
            <TeamHeader>
                <Text sx={{
                    color: 'white',
                    fontSize: '1rem'
                }}>{props.name}</Text>
                <Button
                    size='xs'
                    onClick={joinTeam}
                    disabled={isAlreadyInTeam(currentPlayerId, props.players)}
                    sx={{
                        backgroundColor: 'var(--alt-highlight-color)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'var(--alt-color)',
                            color: 'white',
                        }
                    }}>
                    {messages['nui.duel.join']}
                </Button>
            </TeamHeader>
            <Flex sx={{
                flexDirection: 'column',
                gap: '10px',
                backgroundColor: 'var(--alt-opacity-color)',
                borderRadius: '10px',
                height: '100%',
                paddingTop: '10px',
                paddingBottom: '10px',
                overflow: 'auto'
            }}>
                {props.players?.length > 0 ? props.players.map((player) => {
                    return (
                        <Flex key={player.id} sx={{
                            flexDirection: 'row',
                            gap: '10px',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text sx={{
                                color: 'white',
                                fontSize: '1rem'
                            }}>{player.name}</Text>
                        </Flex>
                    )
                }) :
                    <Flex sx={{
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text sx={{
                            color: 'white',
                            fontSize: '1rem'
                        }}>{messages['nui.duel.noplayers']}</Text>
                    </Flex>
                }
            </Flex>
        </TeamContainer>
    )
}