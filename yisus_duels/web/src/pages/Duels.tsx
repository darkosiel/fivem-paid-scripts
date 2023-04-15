import styled from "@emotion/styled";
import { Divider, Flex } from "@mantine/core";
import React, { FC } from "react";
import { CreateDuel } from "../components/CreateDuel";
import { DuelList } from "../components/DuelList";
import { DuelLobby } from "../components/DuelLobby";
import { Leaderboard } from "../components/Leaderboard";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { useGlobalStore } from "../states/useGlobalState";
import { isEnvBrowser } from "../utils/misc";

const DuelsContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 40vw;
    width: 40vw;
    max-height: 68vh;
    height: auto;
    border-radius: 15px;
    background-color: var(--primary-color);
    overflow: hidden;
`

const DuelsHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 10px 10px 10px 10px;
    gap: 10vw;
    border-bottom-color: #ffbb00;
`

type DuelHeaderItemProps = {
    active: boolean;
    disabled?: boolean;
}

const DuelHeaderItem = styled.a<DuelHeaderItemProps>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${props => props.disabled ? 'grey' : 'white'};
    cursor: pointer;
    border-radius: 5px;
    min-width: 5rem;
    min-height: 30px;
    font-size: 0.9rem;
    background-color: ${props => props.active ? 'var(--alt-highlight-color)' : 'transparent'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`

const DuelsDivider = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: -15px;
`

const DuelsContent = styled.div`
    margin: 10px 30px 30px 30px;
    height: 100%;
`

export const Duels: FC = () => {
    const debug = isEnvBrowser();
    const messages = useGlobalStore(state => state.messages);
    const openedRoute = useGlobalStore(state => state.openedRoute);
    const setOpenedRoute = useGlobalStore(state => state.setOpenedRoute);

    const currentLobby = useGlobalStore(state => state.currentLobby);
    const setCurrentLobby = useGlobalStore(state => state.setCurrentLobby);
    const setLobbies = useGlobalStore(state => state.setLobbies);

    useNuiEvent('updateLobbies', (data) => {
        setLobbies(data.lobbies);
        if (currentLobby !== null) {
            data.lobbies?.forEach(element => {
                if (element.id === currentLobby.id) {
                    return setCurrentLobby(element);
                }
            });
        }
    });

    useNuiEvent('setCurrentLobby', (data) => {
        setCurrentLobby(data.lobby);
        setOpenedRoute('create');
    });

    useNuiEvent('removeCurrentLobby', () => {
        setCurrentLobby(null);
        setOpenedRoute('matches');
    });

    return (
        <>
            <Flex
                justify={'center'}
                align={'center'}
                sx={{
                    width: '100%',
                    height: '100vh',
                    ...(debug && {
                        backgroundImage: 'url("https://i.imgur.com/3pzRj9n.png")',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }),

                }}
            >
                <DuelsContainer>
                    <DuelsHeader>
                        <DuelHeaderItem active={openedRoute == 'create'} onClick={() => setOpenedRoute('create')}>{currentLobby === null ? messages['nui.duel.create'] : messages['nui.duel.inlobby']}</DuelHeaderItem>
                        <DuelHeaderItem active={openedRoute == 'ranking'} disabled={currentLobby !== null} onClick={() => { !currentLobby && setOpenedRoute('ranking') }}>{messages['nui.duel.ranking']}</DuelHeaderItem>
                        <DuelHeaderItem active={openedRoute == 'matches'} disabled={currentLobby !== null} onClick={() => { !currentLobby && setOpenedRoute('matches') }}>{messages['nui.duel.matches']}</DuelHeaderItem>
                    </DuelsHeader>
                    <DuelsDivider>
                        <Divider my='xs' size='sm' color={'var(--alt-color)'} w={'90%'} />
                    </DuelsDivider>
                    <Flex
                        h={'100%'}
                        w={'100%'}
                        sx={{
                            flexDirection: 'column',
                            overflow: 'auto'
                        }}
                    >
                        <DuelsContent>

                            {openedRoute == 'create' && currentLobby === null && <CreateDuel />}
                            {openedRoute == 'create' && currentLobby !== null && <DuelLobby lobby={currentLobby} />}
                            {openedRoute == 'ranking' && <Leaderboard />}
                            {openedRoute == 'matches' && <DuelList />}
                        </DuelsContent>
                    </Flex>
                </DuelsContainer>

            </Flex>
        </>
    )
}