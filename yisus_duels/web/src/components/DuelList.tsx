import styled from "@emotion/styled";
import { Avatar, Badge, Flex, Text } from "@mantine/core";
import React, { FC } from "react";
import { Lobby, useGlobalStore } from "../states/useGlobalState";
import { fetchNui } from "../utils/fetchNui";
import lobbyUtils from "../utils/lobbyUtils";
import { isEnvBrowser } from "../utils/misc";
import { PasswordModal } from "./PasswordModal";

type DuelRowProperties = {
    disabled?: boolean;
}

const DuelRow = styled.div<DuelRowProperties>`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 50px;
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    gap: 0.5vh;
    background-color: var(--alt-opacity-color);
    border: 1px solid transparent;
    &:hover {
        border: ${props => !props.disabled && '1px solid var(--alt-color)'};
        cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    }
`

export const DuelList: FC = () => {
    const [requestPassword, setRequestPassword] = React.useState(false);
    const [selectedLobby, setSelectedLobby] = React.useState<Lobby | undefined>(undefined);

    const messages = useGlobalStore(state => state.messages);
    const lobbies = useGlobalStore(state => state.lobbies);
    const setCurrentLobby = useGlobalStore(state => state.setCurrentLobby);
    const setOpenedRoute = useGlobalStore(state => state.setOpenedRoute);

    const joinDuel = async (lobby: Lobby, password?: string) => {
        if (lobbyUtils.getTotalPlayers(lobby) >= lobbyUtils.getMaxPlayers(lobby)) {
            return;
        }

        if (typeof lobby.password === 'string' && lobby.password.length > 0 && !password) {
            setSelectedLobby(lobby);
            setRequestPassword(true);
            return;
        }

        const joined = await fetchNui('joinLobby', { lobbyId: lobby.id, type: !password ? 'open' : 'private', password: password }, true)
        if (joined) {
            setCurrentLobby(lobby);
            setOpenedRoute('create');
            return;
        }
    }

    const passwordSubmit = (password: string) => {
        setRequestPassword(false);
        if (selectedLobby) {
            joinDuel(selectedLobby, password);
        }
        return;
    }

    return (

        <Flex
            direction='column'
            gap={'1vh'}
        >
            {requestPassword && <PasswordModal onSubmit={passwordSubmit} />}
            {lobbies && lobbies.length > 0 ? lobbies.map((lobby, _) => {
                return (
                    <DuelRow key={lobby.id} disabled={lobbyUtils.getTotalPlayers(lobby) >= lobbyUtils.getMaxPlayers(lobby)} onClick={() => joinDuel(lobby)}>
                        <Flex direction='row' gap='1vw' justify='center'>
                            <Badge color="grape" size="lg">{lobby.duelmode}</Badge>
                            <Badge color="grape" size="lg">{lobby.rounds} {messages['nui.duel.rounds'].toUpperCase()}</Badge>
                            <Badge color="grape" size="lg">
                                <Avatar
                                    size={24}
                                    mr={5}
                                    src={isEnvBrowser() ? `../../dist/images/weapons/${lobby.weapon}.png` : `./images/weapons/${lobby.weapon}.png`}
                                />
                            </Badge>
                            <Badge color="grape" size="lg">{lobby.map}</Badge>
                            <Badge color="grape" size="lg">{!lobby.password ? messages['nui.duel.open'].toUpperCase() : messages['nui.duel.private'].toUpperCase()}</Badge>
                        </Flex>
                        <Flex direction='row' gap='1vw' justify='center'>
                            <Badge color="grape" size="lg">{messages['nui.duel.host']} {lobbyUtils.getLobbyName(lobby)}</Badge>
                            <Badge color="grape" size="lg">{lobbyUtils.getTotalPlayers(lobby)}/{lobbyUtils.getMaxPlayers(lobby)}</Badge>
                        </Flex>
                    </DuelRow>
                )
            }) :
                <Text align='center'>{messages['nui.duel.empty']}</Text>
            }
        </Flex>
    )
}