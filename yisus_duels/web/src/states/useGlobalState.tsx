import { create } from 'zustand'
import { mockData } from '../mock/mockData';
import { isEnvBrowser } from '../utils/misc';

export type Lang = {
    [key: string]: string;
}

export type IamgeLabelValue = {
    image: string;
    label: string;
    value: string;
}

export type GameConfig = {
    weapons: IamgeLabelValue[];
    maps: IamgeLabelValue[];
    maxrounds: number;
}

export type Player = {
    id: number;
    name: string;
    kills: number;
    deaths: number;
    host: boolean;
    ready: boolean;
}

export type Lobby = {
    id: number;
    created: number;
    duelmode: string;
    rounds: number;
    weapon: string;
    map: string;
    password: string | boolean;
    team1: Player[];
    team2: Player[];
}

export type LeaderboardItem = {
    top: number;
    name: string;
    kills: number;
    deaths: number;
    wins: number;
    loses: number;
}

export type Match = {
    team1: number;
    team2: number;
    timer: number;
    round: number;
}

export interface UseGlobalStore {
    messages: Lang;
    setMessages: (data: Lang) => void;

    openedRoute: string;
    setOpenedRoute: (route: string) => void;

    gameConfig: GameConfig;
    setConfig: (data: GameConfig) => void;

    lobbies: Lobby[];
    setLobbies: (data: Lobby[]) => void;
    addLobby: (data: Lobby) => void;
    removeLobby: (id: number) => void;

    currentLobby: Lobby | null;
    setCurrentLobby: (lobby: Lobby | null) => void;

    currentPlayerId: number;
    setCurrentPlayerId: (id: number) => void;

    leaderboard: LeaderboardItem[];
    setLeaderboard: (data: LeaderboardItem[]) => void;

    match: Match | null;
    setMatch: (data: Match | null) => void;
}

export const useGlobalStore = create<UseGlobalStore>(set => ({
    messages: isEnvBrowser() && mockData.messages || {},
    setMessages: (data: any) => set(state => ({ ...state, messages: data })),

    openedRoute: 'create',
    setOpenedRoute: (route: string) => set(state => ({ ...state, openedRoute: route })),

    gameConfig: mockData.gameConfig,
    setConfig: (data: GameConfig) => set(state => ({ ...state, gameConfig: data })),

    lobbies: isEnvBrowser() && mockData.lobbies || [],
    setLobbies: (data: Lobby[]) => set(state => ({ ...state, lobbies: data })),
    addLobby: (data: Lobby) => set(state => ({ ...state, lobbies: [...state.lobbies, data] })),
    removeLobby: (id: number) => set(state => ({ ...state, lobbies: state.lobbies.filter(lobby => lobby.id !== id) })),

    currentLobby: isEnvBrowser() && mockData.lobbies[0] || null,
    setCurrentLobby: (lobby: Lobby | null) => set(state => ({ ...state, currentLobby: lobby })),

    currentPlayerId: -1,
    setCurrentPlayerId: (id: number) => set(state => ({ ...state, currentPlayerId: id })),

    leaderboard: isEnvBrowser() && mockData.leaderboard || [],
    setLeaderboard: (data: LeaderboardItem[]) => set(state => ({ ...state, leaderboard: data })),

    match: isEnvBrowser() && { team1: 0, team2: 0, round: 1, timer: 300 } || null,
    setMatch: (data: Match | null) => set(state => ({ ...state, match: data })),
}));