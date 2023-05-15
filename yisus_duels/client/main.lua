local config = import('data')
local nuiReady, nuiActive = false, false
local Lobbies = GlobalState.DuelsGames or {}
local currentMatch = false
local doingCountdown = false

local function getMapData(map)
    for i = 1, #config.maps, 1 do
        if config.maps[i].value == map then
            return config.maps[i]
        end
    end
    return false
end

local function toggleUI(state)
    if not nuiReady then
        return bridge.notify(L('game.notready'), 'info')
    end

    local leaderboard = lib.callback.await('duels:getLeaderboard', false)

    SendNUIMessage({
        action = 'toggleMenu',
        data = {
            state = state,
            lobbies = state and Lobbies,
            leaderboard = state and leaderboard
        }
    })

    SetNuiFocus(state, state)
    nuiActive = state

    bridge.toggledUI(state)
end

local function updateNuiLobbies()
    SendNUIMessage({
        action = 'updateLobbies',
        data = {
            lobbies = Lobbies
        }
    })
end

local function inGameUI(show, team1, team2, round)
    SendNUIMessage({
        action = 'toggleInGameUI',
        data = {
            state = show,
            team1 = team1,
            team2 = team2,
            round = round,
            timerSeconds = config.matchTime
        }
    })
end

local function countdown()
    SendNUIMessage({
        action = 'toggleCountdown',
        data = {
            state = true
        }
    })
    doingCountdown = true

    FreezeEntityPosition(PlayerPedId(), true)

    while doingCountdown == true do
        Wait(250)
    end

    FreezeEntityPosition(PlayerPedId(), false)
end

local function getPlayerTeam()
    if not currentMatch then return end
    for i = 1, #currentMatch.team1, 1 do
        if game.team1[i].id == cache.serverId then
            return 'team1'
        end
    end
    for i = 1, #currentMatch.team2, 1 do
        if game.team2[i].id == cache.serverId then
            return 'team2'
        end
    end
end

AddStateBagChangeHandler('DuelsGames', 'global', function(_, _, value)
    Lobbies = value
    if nuiActive then
        updateNuiLobbies()
    end
end)

RegisterNUICallback('loaded', function(_, cb)
    Wait(500)

    local gameConfig = {}

    gameConfig.weapons = config.weapons

    for i = 1, #gameConfig.weapons, 1 do
        local weapon = gameConfig.weapons[i]
        weapon.image = './images/weapons/' .. weapon.value:upper() .. '.png'
    end

    gameConfig.maps = {}
    for i = 1, #config.maps, 1 do
        local map = config.maps[i]
        gameConfig.maps[i] = {
            value = map.value,
            label = map.label,
            image = './images/maps/' .. map.value:upper() .. '.png'
        }
    end

    gameConfig.maxrounds = config.maxRounds or 5

    cb({ gameConfig = gameConfig, playerId = cache.serverId, messages = GetLocales() })

    nuiReady = true
end)

RegisterNUICallback('exit', function(_, cb)
    toggleUI(false)
    cb(true)
end)

RegisterNUICallback('createLobby', function(data, cb)
    local createdLobby = lib.callback.await('duels:createLobby', false, data)
    cb(createdLobby)
end)

RegisterNUICallback('joinLobby', function(data, cb)
    local joinedLobby = lib.callback.await('duels:joinLobby', false, data)
    cb(joinedLobby)
end)

RegisterNUICallback('joinTeam', function(data, cb)
    local joinedLobby = lib.callback.await('duels:joinTeam', false, data)
    cb(joinedLobby)
end)

RegisterNUICallback('leaveLobby', function(data, cb)
    local leftLobby = lib.callback.await('duels:leaveLobby', false, data.lobbyId)
    cb(leftLobby)
end)

RegisterNUICallback('startMatch', function(data, cb)
    local lobbyId = data.lobbyId
    local map = getMapData(data.map)
    if not map then
        bridge.notify(L('game.invalidmap'), 'error')
        return cb(false)
    end
    local startedMatch = lib.callback.await('duels:startMatch', false, lobbyId, map)
    cb(startedMatch)
end)

RegisterNUICallback('matchTimerFinished', function(_, cb)
    cb(true)
    TriggerServerEvent('duels:matchTimerOut')
end)

RegisterNUICallback('countdownFinish', function(_, cb)
    cb(true)
    doingCountdown = false
end)

RegisterNetEvent('duels:lobbyClosed', function()
    bridge.notify(L('game.lobbyhostleft'), 'info')
    SendNUIMessage({
        action = 'removeCurrentLobby',
        data = {}
    })
end)

RegisterNetEvent('duels:matchInitializing', function(game)
    currentMatch = game
    
    toggleUI(false)

    if bridge?.showLoadingPrompt then
        bridge.showLoadingPrompt(L('nui.prompt.message'))
    else
        SendNUIMessage({
            action = 'toggleLoadingPrompt',
            data = {
                state = true
            }
        })
    end
end)

RegisterNetEvent('duels:matchInit', function()
    if bridge?.hideLoadingPrompt then
        bridge.hideLoadingPrompt()
    else
        SendNUIMessage({
            action = 'toggleLoadingPrompt',
            data = {
                state = false
            }
        })
    end

    if (not currentMatch) then return end

    bridge.matchStarted(getPlayerTeam())

    SetEntityInvincible(PlayerPedId(), false)
    NetworkSetFriendlyFireOption(true)
    SetCanAttackFriendly(PlayerPedId(), true, true)

    RemoveAllPedWeapons(PlayerPedId(), true)

    local pedCoords = GetEntityCoords(PlayerPedId())
    local foundSafeZ, safeZ = GetGroundZAndNormalFor_3dCoord(pedCoords.x, pedCoords.y, pedCoords.z)

    if not foundSafeZ then
        safeZ = pedCoords.z
    end

    NetworkResurrectLocalPlayer(pedCoords.x, pedCoords.y, safeZ, 0.0, false, false)

    countdown()

    Wait(50)

    GiveWeaponToPed(PlayerPedId(), joaat(currentMatch.weapon), 999, false, true)
    SetPedAmmo(PlayerPedId(), joaat(currentMatch.weapon), 999)
    SetCurrentPedWeapon(PlayerPedId(), joaat(currentMatch.weapon), true)

    inGameUI(true, currentMatch.team1points, currentMatch.team2points, currentMatch.playingRound)
end)

RegisterNetEvent('duels:nextMatchRound', function(match, finishedMatch, winner, reason)
    currentMatch = match
    
    if not finishedMatch and winner and reason == 'next_round' then
        if winner ~= 0 then
            bridge.notify(L('game.nextround.win', winner), 'success')
        else
            bridge.notify(L('game.nextround.draw'), 'success')
        end
    elseif finishedMatch and winner then
        if reason == 'player_disconnect' then
            bridge.notify(L('game.nextround.disconnect'), 'info')
        else
            if winner ~= 0 then
                if reason == 'finished_match' then
                    bridge.notify(L('game.finishmatch.win', winner), 'success')
                elseif reason == 'timeout' then
                    bridge.notify(L('game.finishmatch.timeout', winner), 'success')
                end
            else
                if reason == 'finished_match' then
                    bridge.notify(L('game.finishmatch.draw'), 'success')
                else
                    bridge.notify(L('game.nextround.finishdraw'), 'success')
                end
            end
        end
    end

    SetEntityInvincible(PlayerPedId(), false)
    NetworkSetFriendlyFireOption(not finishedMatch)
    SetCanAttackFriendly(PlayerPedId(), not finishedMatch, not finishedMatch)

    Wait(100)

    if finishedMatch then
        bridge.finishedMatch(getPlayerTeam())
        currentMatch = false
    end

    local pedCoords = GetEntityCoords(PlayerPedId())
    local foundSafeZ, safeZ = GetGroundZAndNormalFor_3dCoord(pedCoords.x, pedCoords.y, pedCoords.z)

    if not foundSafeZ then
        safeZ = pedCoords.z
    end

    NetworkResurrectLocalPlayer(pedCoords.x, pedCoords.y, safeZ, 0.0, false, false)

    if finishedMatch then
        RemoveAllPedWeapons(PlayerPedId(), true)
        inGameUI(false)
    else
        RemoveAllPedWeapons(PlayerPedId(), true)
        Wait(50)
        inGameUI(true, currentMatch.team1points, currentMatch.team2points, currentMatch.playingRound)
        countdown()
        Wait(50)
        GiveWeaponToPed(PlayerPedId(), joaat(currentMatch.weapon), 999, false, true)
        SetPedAmmo(PlayerPedId(), joaat(currentMatch.weapon), 999)
        SetCurrentPedWeapon(PlayerPedId(), joaat(currentMatch.weapon), true)
    end
end)

local canDoCommand = true
RegisterCommand(config.exitDuelCommand, function(source, args, raw)
    if not exports['yisus_duels']:isPlaying() then return print('You\'re not playing a duel so, can execute this command') end
    if not canDoCommand then return print('You\'re on cooldown to use /' + config.exitDuelCommand) end
    TriggerServerEvent('duels:exitRequest')
    canDoCommand = false
    SetTimeout(5000, function()
        canDoCommand = true
    end)
end, false)

exports('toggleUI', function(toggle)
    if exports['yisus_duels']:isPlaying() then return print('You can\'t open duels lobby when in a match') end
    toggleUI(toggle)
end)

exports('isPlaying', function()
    return LocalPlayer.state.inDuel ~= nil
end)