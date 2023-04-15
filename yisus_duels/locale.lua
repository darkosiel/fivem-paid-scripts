local strings = {
    ['en'] = {
        ['nui.duel.create'] = '+ Create',
        ['nui.duel.inlobby'] = 'In Lobby',
        ['nui.duel.ranking'] = 'Ranking',
        ['nui.duel.matches'] = 'Matches',
        ['nui.duel.createduel'] = 'Create Duel',
        ['nui.duel.duelmode.label'] = 'Select Duel Mode',
        ['nui.duel.duelmode.placeholder'] = 'Pick desired duel mode',
        ['nui.duel.roundcount.label'] = 'Select Number Of Rounds',
        ['nui.duel.roundcount.placeholder'] = 'Pick desired number of rounds',
        ['nui.duel.weapon.label'] = 'Select Weapon',
        ['nui.duel.weapon.placeholder'] = 'Pick desired duel weapon',
        ['nui.duel.weapon.notfound'] = 'No weapon found',
        ['nui.duel.map.text'] = 'Select an arena',
        ['nui.duel.password.label'] = 'Duel Password',
        ['nui.duel.password.description'] = 'Put a password to make your duel private, leave empty for public',
        ['nui.duel.create.submit'] = 'Create Duel',
        ['nui.duel.rounds'] = 'ROUNDS',
        ['nui.duel.open'] = 'OPEN',
        ['nui.duel.private'] = 'PRIVATE',
        ['nui.duel.host'] = 'Host:',
        ['nui.duel.empty'] = 'No duel lobbies, yet',
        ['nui.duel.playerlobby'] = 'Lobby',
        ['nui.duel.team1'] = 'Team 1',
        ['nui.duel.team2'] = 'Team 2',
        ['nui.duel.start'] = 'Start',
        ['nui.duel.leave'] = 'Leave',
        ['nui.duel.join'] = 'Join',
        ['nui.duel.noplayers'] = 'No players in this team',
        ['nui.lb.top'] = 'Top',
        ['nui.lb.name'] = 'Player',
        ['nui.lb.kd'] = 'K/D',
        ['nui.lb.wl'] = 'W/L',
        ['nui.prompt.message'] = 'Loading duel...',
        ['nui.match.round'] = 'Round',
        ['nui.duel.mustweapon'] = 'You must select a weapon',
        ['nui.duel.mustround'] = 'You must select a round count',
        ['nui.duel.badround'] = 'You can\'t select more than',
        ['nui.password.title'] = 'Input Lobby Password',

        ['game.notready'] = 'Duels are not ready yet',
        ['game.invalidmap'] = 'An invalid map was selected',
        ['game.lobbyhostleft'] = 'You have been kicked from the lobby because host left',
        ['game.nextround.win'] = 'Team %s won the round',
        ['game.nextround.draw'] = 'No one won the round (draw)',
        ['game.nextround.disconnect'] = 'A player disconnected, the match has been cancelled',
        ['game.nextround.finishdraw'] = 'Time Out! No one won the round (DRAW)',
        ['game.finishmatch.win'] = 'Team %s won the match',
        ['game.finishmatch.timeout'] = 'Time Out! Team %s won the match!',
        ['game.finishmatch.draw'] = 'No one won the match (DRAW)',
    },
    ['es'] = {
        ['nui.duel.create'] = '+ Crear',
        ['nui.duel.inlobby'] = 'En Sala',
        ['nui.duel.ranking'] = 'Ranking',
        ['nui.duel.matches'] = 'Salas',
        ['nui.duel.createduel'] = 'Crear Sala',
        ['nui.duel.duelmode.label'] = 'Modo de duelo',
        ['nui.duel.duelmode.placeholder'] = 'Selecciona el modo de duelo deseado',
        ['nui.duel.roundcount.label'] = 'Número de rondas',
        ['nui.duel.roundcount.placeholder'] = 'Introduce el número de rondas a jugar',
        ['nui.duel.weapon.label'] = 'Arma',
        ['nui.duel.weapon.placeholder'] = 'Selecciona el arma para el duelo',
        ['nui.duel.weapon.notfound'] = 'Arma no encontrada',
        ['nui.duel.map.text'] = 'Selecciona el mapa',
        ['nui.duel.password.label'] = 'Contraseña para la Sala',
        ['nui.duel.password.description'] = 'Introduce una contraseña para hacer la sala privada, deja en blanco para que sea abierta',
        ['nui.duel.create.submit'] = 'Crear Sala',
        ['nui.duel.rounds'] = 'RONDAS',
        ['nui.duel.open'] = 'ABIERTA',
        ['nui.duel.private'] = 'PRIVADA',
        ['nui.duel.host'] = 'Host:',
        ['nui.duel.empty'] = 'No hay salas, aún',
        ['nui.duel.playerlobby'] = 'Sala',
        ['nui.duel.team1'] = 'Equipo 1',
        ['nui.duel.team2'] = 'Equipo 2',
        ['nui.duel.start'] = 'Comenzar',
        ['nui.duel.leave'] = 'Salir',
        ['nui.duel.join'] = 'Entrar',
        ['nui.duel.noplayers'] = 'Este equipo no tiene jugadores',
        ['nui.lb.top'] = 'Top',
        ['nui.lb.name'] = 'Jugador',
        ['nui.lb.kd'] = 'K/D',
        ['nui.lb.wl'] = 'W/L',
        ['nui.prompt.message'] = 'Cargando duelo...',
        ['nui.match.round'] = 'Ronda',
        ['nui.duel.mustweapon'] = 'Debes seleccionar un arma',
        ['nui.duel.mustround'] = 'Debes introducir el número de rondas',
        ['nui.duel.badround'] = 'No puedes introducir mas de',
        ['nui.password.title'] = 'Introduce la contraseña',

        ['game.notready'] = 'Los duelos no están listos aún',
        ['game.invalidmap'] = 'Has seleccionado un mapa inválido',
        ['game.lobbyhostleft'] = 'Has sido expulsado de la sala porque el host se ha ido',
        ['game.nextround.win'] = 'El equipo %s ha ganado la ronda',
        ['game.nextround.draw'] = 'Nadie ha ganado la ronda (EMPATE)',
        ['game.nextround.disconnect'] = 'Un jugador se ha desconectado, la partida ha sido cancelada',
        ['game.nextround.finishdraw'] = '¡Tiempo Agotado! Nadie ha ganado la ronda (EMPATE)',
        ['game.finishmatch.win'] = 'El equipo %s ha ganado la partida',
        ['game.finishmatch.timeout'] = '¡Tiempo Agotado! El equipo %s ha ganado la partida!',
        ['game.finishmatch.draw'] = 'Nadie ha ganado la partida (EMPATE)',
    },
}

local lang = 'es'

if not strings[lang] then
    print(('[EDEN_DUELS] [WARN] Locale %s not found, using en instead'):format(lang))
end


function L(name, ...)
    if not strings[lang][name] then
        print(('[EDEN_DUELS] [ERROR] Missing translation %s for locale %s'):format(name, lang))
        return 'Missing translation'
    end
    return strings[lang][name]:format(...)
end

function GetLocales()
    return strings[lang]
end
