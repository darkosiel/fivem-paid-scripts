import { MantineProvider } from '@mantine/core';
import React, { useEffect } from 'react';
import { LoadingPrompt } from './components/LoadingPrompt';
import { MatchCountdown } from './components/MatchCountdown';
import { useNuiEvent } from './hooks/useNuiEvent';
import { mockData } from './mock/mockData';
import { Duels } from './pages/Duels';
import { Match } from './pages/Match';
import { useGlobalStore } from './states/useGlobalState';
import { theme } from './theme/theme';
import { fetchNui } from './utils/fetchNui';

const App: React.FC = () => {
    const [luaReady, setLuaReady] = React.useState(false);
    const [showLoadingPrompt, setLoadingPrompt] = React.useState(false);
    const [showMenu, setShowMenu] = React.useState(false);
    const [showInGameUI, setShowInGameUI] = React.useState(false);
    const [showCountdown, setShowCountdown] = React.useState(false);
    const setGameConfig = useGlobalStore(state => state.setConfig);
    const setLobbies = useGlobalStore(state => state.setLobbies);
    const setLeaderboard = useGlobalStore(state => state.setLeaderboard);
    const setCurrentPlayerId = useGlobalStore(state => state.setCurrentPlayerId);
    const setMessages = useGlobalStore(state => state.setMessages);
    const setMatch = useGlobalStore(state => state.setMatch);
    const currentLobby = useGlobalStore(state => state.currentLobby);
    const setCurrentLobby = useGlobalStore(state => state.setCurrentLobby);

    useEffect(() => {
        const handleKeyDown = async (event) => {
            if (event.key === "Escape") {
                await fetchNui('exit', {}, true)
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    fetchNui('loaded', {}, { gameConfig: mockData.gameConfig, playerId: 1, messages: mockData.messages }).then((data) => {
        setGameConfig(data.gameConfig);
        setCurrentPlayerId(data.playerId);
        setMessages(data.messages);
        setLuaReady(true);
    });

    useNuiEvent('toggleLoadingPrompt', (data) => {
        if (data.state !== showLoadingPrompt) setLoadingPrompt(data.state);
    });

    useNuiEvent('toggleMenu', (data) => {
        setShowMenu(data.state);
        if (data.lobbies) {
            setLobbies(data.lobbies);
        }
        if (data.leaderboard) {
            setLeaderboard(data.leaderboard);
        }
    });

    useNuiEvent('toggleInGameUI', (data) => {
        if (data.state !== showInGameUI) setShowInGameUI(data.state);
        if (data.state) {
            if (currentLobby !== null) {
                setCurrentLobby(null);
            }
            setMatch({ team1: data.team1, team2: data.team2, timer: data.timerSeconds, round: data.round });
        }
    });

    useNuiEvent('toggleCountdown', (data) => {
        if (data.state !== showCountdown) setShowCountdown(data.state);
    });

    const onCountdownFinish = async () => {

        setShowCountdown(false);
        await fetchNui('countdownFinish', {}, true);
    }

    return (
        <MantineProvider
            withNormalizeCSS
            theme={theme}
        >
            {luaReady && showLoadingPrompt && <LoadingPrompt />}

            {luaReady && !showInGameUI && !showCountdown && showMenu && <Duels />}
            {luaReady && !showMenu && showInGameUI && <Match />}
            {luaReady && !showMenu && showCountdown && <MatchCountdown onFinish={onCountdownFinish} countdown={5} />}
        </MantineProvider>
    )
}

export default App;