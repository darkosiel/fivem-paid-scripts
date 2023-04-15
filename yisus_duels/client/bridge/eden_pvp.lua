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
function bridge.matchStarted()
    return
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

RegisterCommand('duels', function(source, args, raw)
    exports['eden_duels']:toggleUI(true)
end, false)
