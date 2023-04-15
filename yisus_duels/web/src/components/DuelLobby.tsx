import styled from "@emotion/styled";
import { Avatar, Badge, Button, Flex, Text } from "@mantine/core";
import React, { FC } from "react";
import { Lobby, useGlobalStore } from "../states/useGlobalState";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";
import lobbyUtils from "../utils/lobbyUtils";
import { TeamSelector } from "./TeamSelector";


const DuelLobbyContainer = styled.div`
    margin: 10px 30px 30px 30px;
    height: 100%;
`

type DuelLobbyProps = {
    lobby: Lobby | null;
}

export const DuelLobby: FC<DuelLobbyProps> = (props) => {
    const debug = isEnvBrowser();
    const messages = useGlobalStore(state => state.messages);
    const currentPlayerId = useGlobalStore(state => state.currentPlayerId);

    const onLeaveLobby = async () => {
        const leaved = await fetchNui('leaveLobby', { lobbyId: props.lobby!.id });
        if (leaved) useGlobalStore.setState({ currentLobby: null });
    }

    const startMatch = async () => await fetchNui('startMatch', { lobbyId: props.lobby!.id, map: props.lobby!.map });

    return (
        <DuelLobbyContainer>
            <Flex
                direction='row'
                w='100%'
                justify='center'
                sx={{
                    marginBottom: '15px'
                }}
            >
                <Text ta='center' size='26px'>{lobbyUtils.getLobbyName(props.lobby!)} {messages['nui.duel.playerlobby']}</Text>
            </Flex>
            <Flex
                direction='row'
                w='100%'
                justify='center'
                sx={{
                    marginBottom: '15px'
                }}
                gap={10}
            >
                <Badge color="grape" size="xl">{props.lobby!.duelmode}</Badge>
                <Badge color="grape" size="xl">{props.lobby!.rounds} {messages['nui.duel.rounds'].toUpperCase()}</Badge>
                <Badge color="grape" size="xl">
                    <Avatar
                        size={24}
                        mr={5}
                        src={debug ? `../../dist/images/weapons/${props.lobby!.weapon}.png` : `./images/weapons/${props.lobby!.weapon}.png`}
                    />
                </Badge>
                <Badge color="grape" size="xl">{props.lobby!.map}</Badge>
                <Badge color="grape" size="xl">{!props.lobby!.password ? messages['nui.duel.open'].toUpperCase() : messages['nui.duel.private'].toUpperCase()}</Badge>
            </Flex>
            <Flex
                direction='row'
                w='100%'
                justify='center'
                sx={{
                    marginBottom: '15px'
                }}
                gap={10}
            >
                <TeamSelector lobbyId={props.lobby!.id} team={1} name={messages['nui.duel.team1']} players={props.lobby?.team1 || []}></TeamSelector>
                <TeamSelector lobbyId={props.lobby!.id} team={2} name={messages['nui.duel.team2']} players={props.lobby?.team2 || []}></TeamSelector>
            </Flex>
            <Flex
                direction='row'
                w='100%'
                justify='space-evenly'
                sx={{
                    marginTop: '3vh'
                }}
            >
                <Button
                    onClick={startMatch}
                    disabled={lobbyUtils.isLobbyHost(props.lobby!, currentPlayerId) || props.lobby?.team1.length !== props.lobby?.team2.length}
                    sx={{
                        backgroundColor: 'var(--alt-highlight-color)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'var(--alt-color)',
                            color: 'white',
                        }
                    }}>
                    {messages['nui.duel.start']}
                </Button>
                <Button color='red' onClick={onLeaveLobby}>
                    {messages['nui.duel.leave']}
                </Button>
            </Flex>

        </DuelLobbyContainer>
    )
}