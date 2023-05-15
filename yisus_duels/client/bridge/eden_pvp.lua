if GetResourceState('eden') ~= 'started' then return end
bridge = {}

---Called when the UI is toggled
---@param toggled boolean true is opened false if closed
function bridge.toggledUI(toggled)
    if toggled then
        LocalPlayer.state.zone = 'duels'
    else
        LocalPlayer.state.zone = 'lobby'
    end
end

---Called when the match starts
---@param team string team1|team2
function bridge.matchStarted(team)
    -- any logic u want (remove clothing or whatever)
end

---Called when the match ends
---@param team string team1|team2
function bridge.finishedMatch(team)
    -- any logic u want (remove clothing or whatever)
end

---Used to send a notification
---@param text string message
---@param _type string type of notification (info, success, error...)
function bridge.notify(text, _type)
    TriggerEvent('eden:showNotification', text, _type)
end

function bridge.showLoadingPrompt(msg)
    TriggerEvent('eden:showLoadingPrompt', msg)
end

function bridge.hideLoadingPrompt()
    TriggerEvent('eden:hideLoadingPrompt')
end

--- By default the script does not have any option to open the ui, so i added a command as example.
RegisterCommand('duels', function()
    exports['yisus_duels']:toggleUI(true)
end, false)