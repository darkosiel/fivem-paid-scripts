AddEventHandler('gameEventTriggered', function(event, data)
    if event ~= 'CEventNetworkEntityDamage' then return end

    print(LocalPlayer.state.inDuel)
    if LocalPlayer.state.inDuel == nil then return end

    local victim, victimDied = data[1], data[4]
    if not IsPedAPlayer(victim) then return end

    local player = PlayerId()

    local playerPed = PlayerPedId()
    if victimDied and NetworkGetPlayerIndexFromPed(victim) == player and (IsPedDeadOrDying(victim, true) or IsPedFatallyInjured(victim)) then
        local killerEntity = GetPedSourceOfDeath(playerPed)
        local killerClientId = NetworkGetPlayerIndexFromPed(killerEntity)
        Wait(1000)
        if killerEntity ~= playerPed and killerClientId and NetworkIsPlayerActive(killerClientId) then
            TriggerServerEvent('duels:someoneDied', GetPlayerServerId(killerClientId), killerClientId)
        else
            TriggerServerEvent('duels:someoneDied')
        end
    end
end)
