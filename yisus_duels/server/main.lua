local Games = GlobalState.DuelsGames or {}
local StartedGames = {}

local function getIdentifier(source, type)
    local identifiers = GetPlayerIdentifiers(source)

    if table.type(identifiers) == 'empty' then
        return error(('Invalid identifiers for %s player'):format(source), 3)
    end

    for key, value in next, identifiers do
        if value:find(type) then
            return value
        end
    end

    return nil
end

local function updateGlobalGames()
    GlobalState.DuelsGames = Games
end

local function generateDuelId()
    local id = math.random(100000, 999999)
    for i = 1, #Games, 1 do
        if Games[i].id == id then
            return generateDuelId()
        end
    end
    return id
end

local function getGameFromId(id)
    for i = 1, #Games, 1 do
        if Games[i].id == id then
            return Games[i]
        end
    end
end

local function isGameHost(game, id)
    for i = 1, #game.team1, 1 do
        if game.team1[i].id == id then
            return game.team1[i].host
        end
    end
    for i = 1, #game.team2, 1 do
        if game.team2[i].id == id then
            return game.team2[i].host
        end
    end
    return false
end

local function isGamePlayer(game, id)
    for i = 1, #game.team1, 1 do
        if game.team1[i].id == id then
            return true
        end
    end
    for i = 1, #game.team2, 1 do
        if game.team2[i].id == id then
            return true
        end
    end
    return false
end

local function switchTeam(playerId, game)
    local team1 = game.team1
    local team2 = game.team2

    for i = 1, #team1, 1 do
        if team1[i].id == playerId then
            team2[#team2 + 1] = team1[i]
            table.remove(team1, i)
            return true
        end
    end

    for i = 1, #team2, 1 do
        if team2[i].id == playerId then
            team1[#team1 + 1] = team2[i]
            table.remove(team2, i)
            return true
        end
    end

    return false
end

local function triggerGameEvent(game, excludeHost, event, ...)
    for i = 1, #game.team1, 1 do
        if not excludeHost or not game.team1[i].host then
            TriggerClientEvent(event, game.team1[i].id, ...)
        end
    end

    for i = 1, #game.team2, 1 do
        if not excludeHost or not game.team2[i].host then
            TriggerClientEvent(event, game.team2[i].id, ...)
        end
    end
end

local function getMatchFromId(id)
    for i = 1, #StartedGames, 1 do
        if StartedGames[i].id == id then
            return StartedGames[i]
        end
    end
    return false
end

local function matchAddPlayerDeath(match, playerId)
    for i = 1, #match.team1, 1 do
        if match.team1[i].id == playerId then
            match.team1[i].dead = true
            match.team1[i].deaths = match.team1[i].deaths + 1
            return true
        end
    end

    for i = 1, #match.team2, 1 do
        if match.team2[i].id == playerId then
            match.team2[i].dead = true
            match.team2[i].deaths = match.team2[i].deaths + 1
            return true
        end
    end
    return false
end

local function matchAddPlayerKill(match, playerId)
    for i = 1, #match.team1, 1 do
        if match.team1[i].id == playerId then
            match.team1[i].kills += 1
            return true
        end
    end

    for i = 1, #match.team2, 1 do
        if match.team2[i].id == playerId then
            match.team2[i].kills += 1
            return true
        end
    end
    return false
end

local function getMatchDeads(match)
    local team1deads = 0
    local team2deads = 0
    for i = 1, #match.team1, 1 do
        if match.team1[i].dead then
            team1deads = team1deads + 1
        end
    end
    for i = 1, #match.team2, 1 do
        if match.team2[i].dead then
            team2deads = team2deads + 1
        end
    end
    return team1deads, team2deads
end

local function setRoundWinnerPoints(match)
    local team1Death, team2Death = getMatchDeads(match)

    if team1Death == #match.team1 then
        match.team2points = match.team2points + 1
        return 2
    elseif team2Death == #match.team2 then
        match.team1points = match.team1points + 1
        return 1
    else
        match.team1points = match.team1points + 1
        match.team2points = match.team2points + 1
        return 0
    end
end

local function finishMatch(match, winner, saveStats)
    if saveStats then
        for i = 1, #match.team1, 1 do
            local player = match.team1[i]
            local identifier = getIdentifier(player.id, config.mainIdenfitier)
            local kills = player.kills
            local deaths = player.deaths
            local wins = winner == 1 and 1 or 0
            local loses = winner == 1 and 0 or 1
            print("1", identifier, player.name, kills, deaths, wins, loses)
            addPlayerStatToLb(identifier, player.name, kills, deaths, wins, loses)
        end

        for i = 1, #match.team2, 1 do
            local player = match.team2[i]
            local identifier = getIdentifier(player.id, config.mainIdenfitier)
            local kills = player.kills
            local deaths = player.deaths
            local wins = winner == 2 and 1 or 0
            local loses = winner == 2 and 0 or 1
            print("2", identifier, player.name, kills, deaths, wins, loses)
            addPlayerStatToLb(identifier, player.name, kills, deaths, wins, loses)
        end
    end

    for i = 1, #StartedGames, 1 do
        if StartedGames[i].id == match.id then
            table.remove(StartedGames, i)
            break
        end
    end
end

local function handleNextMatchRound(match, finished, winner, cause)
    for i = 1, #match.team1, 1 do
        match.team1[i].dead = false
        local ped = GetPlayerPed(match.team1[i].id)
        local respawnCoords = finished and config.exitCoords or match.mapdata.coords.player[i]
        SetEntityCoords(ped, respawnCoords.x, respawnCoords.y,
            respawnCoords.z, false, false, false, false)
        SetEntityHeading(ped, respawnCoords.w)
        SetEntityHeading(ped, respawnCoords.w)
        if finished then
            SetPlayerRoutingBucket(match.team1[i].id, 0)
            Player(match.team1[i].id).state:set('inDuel', nil, true)
        end
        Wait(10)
    end
    for i = 1, #match.team2, 1 do
        match.team2[i].dead = false
        local ped = GetPlayerPed(match.team2[i].id)
        local respawnCoords = finished and config.exitCoords or match.mapdata.coords.opponent[i]
        SetEntityCoords(ped, respawnCoords.x, respawnCoords.y,
            respawnCoords.z, false, false, false, false)
        SetEntityHeading(ped, respawnCoords.w)
        if finished then
            SetPlayerRoutingBucket(match.team2[i].id, 0)
            Player(match.team2[i].id).state:set('inDuel', nil, true)
        end
        Wait(10)
    end

    if not cause then
        cause = finished and 'finished_match' or 'next_round'
    end

    if cause == 'finished_match' or cause == 'timeout' then
        winner = match.team1points > match.team2points and 1 or match.team2points > match.team1points and 2 or 0
    end

    triggerGameEvent(match, false, 'duels:nextMatchRound', match, finished, winner, cause)
    if finished then
        finishMatch(match, winner, (cause == 'finished_match'))
    end
end

local function checkRoundFinished(match)
    local team1deads, team2deads = getMatchDeads(match)

    if team1deads == #match.team1 or team2deads == #match.team2 then
        local winner = setRoundWinnerPoints(match)
        match.playingRound = match.playingRound + 1
        handleNextMatchRound(match, match.playingRound > match.rounds, winner)
    end
end

lib.callback.register('duels:createLobby', function(playerId, data)
    Games[#Games + 1] = {
        id = generateDuelId(),
        created = os.time(),
        duelmode = data.duelmode,
        rounds = data.rounds,
        weapon = data.weapon,
        map = data.map,
        password = data.password,
        team1 = {
            {
                id = playerId,
                name = GetPlayerName(playerId),
                kills = 0,
                deaths = 0,
                host = true,
                dead = false
            }
        },
        team2 = {},
    }

    updateGlobalGames()

    return Games[#Games]
end)

lib.callback.register('duels:joinLobby', function(playerId, data)
    local lobbyId = data.lobbyId
    local lobbyType = data.type
    local lobbyPassword = data.password

    local game = getGameFromId(lobbyId)

    if not game then
        return false
    end

    if lobbyType ~= 'open' and lobbyPassword ~= game.password then
        bridge.notify(playerId, 'You entered a wrong password', 'error')
        return false
    end

    local totalplayers = tonumber(#game.team1 or 0) + tonumber(#game.team2 or 0)
    local duelplayers = tonumber(game.duelmode:sub(1, 1)) * 2


    if totalplayers >= duelplayers then
        bridge.notify(playerId, 'You cannot join the lobby because is full', 'error')
        return false
    end

    game.team1[#game.team1 + 1] = {
        id = playerId,
        name = GetPlayerName(playerId),
        kills = 0,
        deaths = 0,
        host = false,
        dead = false
    }

    updateGlobalGames()

    return true
end)

lib.callback.register('duels:joinTeam', function(playerId, data)
    local game = getGameFromId(data.lobbyId)
    if not game then
        return false
    end

    local success = switchTeam(playerId, game)

    if success then
        updateGlobalGames()
    end

    return success
end)

lib.callback.register('duels:leaveLobby', function(playerId, lobbyId)
    local game = getGameFromId(lobbyId)
    if not game then return false end

    if not isGamePlayer(game, playerId) then return false end

    if isGameHost(game, playerId) then
        for i = 1, #Games, 1 do
            if Games[i].id == lobbyId then
                table.remove(Games, i)
                break
            end
        end
        triggerGameEvent(game, true, 'duels:lobbyClosed')
    else
        for i = 1, #game.team1, 1 do
            if game.team1[i].id == playerId then
                table.remove(game.team1, i)
                break
            end
        end

        for i = 1, #game.team2, 1 do
            if game.team2[i].id == playerId then
                table.remove(game.team2, i)
                break
            end
        end
    end

    updateGlobalGames()

    Wait(50)

    return true
end)

lib.callback.register('duels:startMatch', function(playerId, lobbyId, mapData)
    local game = getGameFromId(lobbyId)
    if not game then return false end

    if not isGameHost(game, playerId) then return false end

    if #game.team1 ~= #game.team2 then
        bridge.notify(playerId, 'Teams need to be equitable in order to start the match',
            'error')
        return false
    end

    local totalplayers = tonumber(#game.team1 or 0) + tonumber(#game.team2 or 0)
    local duelplayers = tonumber(game.duelmode:sub(1, 1)) * 2

    if totalplayers ~= duelplayers then
        bridge.notify(playerId, 'You need more players to start the match', 'error')
        return false
    end

    StartedGames[#StartedGames + 1] = table.clone(game)

    local match = StartedGames[#StartedGames]

    match.team1points = 0
    match.team2points = 0
    match.playingRound = 1
    match.mapdata = mapData

    for i = 1, #Games, 1 do
        if Games[i].id == lobbyId then
            table.remove(Games, i)
            break
        end
    end

    updateGlobalGames()

    triggerGameEvent(match, false, 'duels:matchInitializing', match)

    Wait(500)

    SetRoutingBucketPopulationEnabled(match.id, false)

    for i = 1, #match.team1, 1 do
        SetPlayerRoutingBucket(match.team1[i].id, match.id)

        Wait(50)

        Player(match.team1[i].id).state:set('inDuel', match.id, true)

        local ped = GetPlayerPed(match.team1[i].id)

        SetEntityCoords(ped, mapData.coords.player[i].x, mapData.coords.player[i].y,
            mapData.coords.player[i].z, false, false, false, false)

        SetEntityHeading(ped, mapData.coords.player[i].w)
    end

    for i = 1, #match.team2, 1 do
        SetPlayerRoutingBucket(match.team2[i].id, match.id)

        Wait(50)

        Player(match.team2[i].id).state:set('inDuel', match.id, true)

        local ped = GetPlayerPed(match.team2[i].id)

        SetEntityCoords(ped, mapData.coords.opponent[i].x, mapData.coords.opponent[i].y,
            mapData.coords.opponent[i].z, false, false, false, false)

        SetEntityHeading(ped, mapData.coords.opponent[i].w)
    end

    Wait(500)

    triggerGameEvent(match, false, 'duels:matchInit')

    return true
end)

RegisterNetEvent('duels:someoneDied', function(killerServerId, killerClientId)
    local deadId = source
    local matchId = Player(deadId).state.inDuel
    local killerId = killerServerId

    if not matchId then return end

    local match = getMatchFromId(matchId)

    if not match then return end

    if not isGamePlayer(match, deadId) then return end

    matchAddPlayerDeath(match, deadId)

    if killerId and isGamePlayer(match, killerId) then
        matchAddPlayerKill(match, killerId)
    end

    checkRoundFinished(match)
end)

RegisterNetEvent('duels:matchTimerOut', function()
    local playerId = source

    local matchId = Player(playerId).state.inDuel
    if not matchId then return end

    local match = getMatchFromId(matchId)
    if not match then return end

    handleNextMatchRound(match, true, 0, 'timeout')
end)

RegisterNetEvent('duels:exitRequest', function()
    local playerId = source
    local state = Player(playerId).state

    local matchId = state.inDuel
    if not matchId then return end

    local match = getMatchFromId(matchId)
    if not match then return end

    handleNextMatchRound(match, true, 0, 'player_disconnect')
end)

-- handle player dropped
AddEventHandler('playerDropped', function(reason)
    local playerId = source
    local state = Player(playerId).state

    local matchId = state.inDuel
    if not matchId then return end

    local match = getMatchFromId(matchId)
    if not match then return end

    handleNextMatchRound(match, true, 0, 'player_disconnect')
end)

exports('isPlaying', function(source)
    return Player(source).state.inDuel ~= nil
end)
