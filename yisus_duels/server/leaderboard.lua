local lb = {}

function loadLeaderboard()
    local lbStr = GetResourceKvpString('leaderboard')
    if lbStr then
        lb = json.decode(lbStr)
    end
end

function saveLeaderboard()
    SetResourceKvp('leaderboard', json.encode(lb))
end

function addPlayerStatToLb(identifier, name, kills, deaths, wins, loses)
    local player = lb[identifier]
    if not player then
        player = {
            name = name,
            kills = 0,
            deaths = 0,
            wins = 0,
            loses = 0,
        }
    end

    player.name = name
    player.kills = player.kills + kills
    player.deaths = player.deaths + deaths
    player.wins = player.wins + wins
    player.loses = player.loses + loses

    lb[identifier] = player

    print('adding player to leaderboard: ', identifier, json.encode(player))

    saveLeaderboard()
end

lib.callback.register('duels:getLeaderboard', function(playerId)
    local lbIntIx = {}

    for _, player in pairs(lb) do
        lbIntIx[#lbIntIx + 1] = player
    end

    return lbIntIx
end)

if config.clearStatsOnRestart then
    SetResourceKvp('leaderboard', json.encode({}))
    print('[EDEN_DUELS] [INFO] Cleared leaderboard')
end

loadLeaderboard()
