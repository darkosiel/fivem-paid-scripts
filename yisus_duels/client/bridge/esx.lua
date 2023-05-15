if GetResourceState('es_extended') ~= 'started' then return end
bridge = {}

local ox_inventory = GetResourceState('ox_inventory') == 'started' and exports.ox_inventory or nil

---Called when the UI is toggled
---@param toggled boolean true is opened false if closed
function bridge.toggledUI(toggled)
    -- any logic u want (set state or whatevet)
end

---Called when the match starts
---@param team string team1|team2
function bridge.matchStarted(team)
    if ox_inventory then
        ox_inventory:weaponWheel(true)
    end
end

---Called when the match ends
---@param team string team1|team2
function bridge.finishedMatch(team)
    if ox_inventory then
        ox_inventory:weaponWheel(false)
    end
end

---Used to send a notification
---@param text string message
---@param _type string type of notification (info, success, error...)
function bridge.notify(text, _type)
    lib.notify({
        title = 'Duels',
        description = text,
        type = _type
    })
end

--- By default the script does not have any option to open the ui, so i added a command as example.
RegisterCommand('duels', function()
    exports['yisus_duels']:toggleUI(true)
end, false)
