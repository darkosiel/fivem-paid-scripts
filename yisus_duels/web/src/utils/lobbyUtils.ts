import { Lobby } from "../states/useGlobalState";

export const isLobbyHost = (lobby: Lobby, playerId: number) => {
    if (lobby.team1) {
        for (let i = 0; i < lobby.team1.length; i++) {
            if (lobby.team1[i].host && lobby.team1[i].id === playerId) {
                return false;
            }
        }
    }
    if (lobby.team2) {
        for (let i = 0; i < lobby.team2.length; i++) {
            if (lobby.team2[i].host && lobby.team2[i].id === playerId) {
                return false;
            }
        }
    }
    return true;
}

export const getLobbyName = (lobby: Lobby) => {
    if (lobby.team1) {
        for (let i = 0; i < lobby.team1.length; i++) {
            if (lobby.team1[i].host) {
                return lobby.team1[i].name;
            }
        }
    }
    if (lobby.team2) {
        for (let i = 0; i < lobby.team2.length; i++) {
            if (lobby.team2[i].host) {
                return lobby.team2[i].name;
            }
        }
    }
    return 'Unknown';
}

export const getTotalPlayers = (lobby: Lobby) => {
    let total = 0;
    if (lobby.team1) {
        total += lobby.team1.length;
    }
    if (lobby.team2) {
        total += lobby.team2.length;
    }
    return total;
}

export const getMaxPlayers = (lobby: Lobby) => {
    return +lobby.duelmode.toString().charAt(0) + +lobby.duelmode.toString().charAt(0);
}

export default {
    isLobbyHost,
    getLobbyName,
    getMaxPlayers,
    getTotalPlayers
}