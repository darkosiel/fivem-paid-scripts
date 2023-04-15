if bridge then return end
bridge = {}

---Used to send a notification
---@param text string message
---@param _type string type of notification (info, success, error...)
function bridge.notify(source, text, _type)
    TriggerClientEvent('ox_lib:notify', source, {
        title = 'Duels',
        description = text,
        type = _type
    })
end
