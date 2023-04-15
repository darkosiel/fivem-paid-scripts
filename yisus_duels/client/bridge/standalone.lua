if bridge then return end
bridge = {}

---Called when the UI is toggled
---@param toggled boolean true is opened false if closed
function bridge.toggledUI(toggled)
    -- any logic u want (set state or whatevet)
end

---Called when the match starts
function bridge.matchStarted()
    -- any logic u want (put clothing or whatever)
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

RegisterCommand('duels', function(source, args, raw)
    exports['eden_duels']:toggleUI(true)
end, false)
