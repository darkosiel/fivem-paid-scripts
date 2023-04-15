if GetResourceState('eden') ~= 'started' then return end
bridge = {}

---Used to send a notification
---@param text string message
---@param _type string type of notification (info, success, error...)
function bridge.notify(source, text, _type)
    TriggerClientEvent('eden:showNotification', source, text, _type)
end
