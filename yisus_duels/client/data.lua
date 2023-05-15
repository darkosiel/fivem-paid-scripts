return {
    matchTime = 300, -- in seconds
    maxRounds = 5,   -- max playable rounds in a duel
    exitDuelCommand = 'exitduel', -- command to exit a duels when you are in a duel
    weapons = {      -- available weapons to play in duels
        { value = 'WEAPON_APPISTOL',     label = 'AP Pistol' },
        { value = 'WEAPON_COMBATPISTOL', label = 'Combat Pistol' }
    },
    maps = {
        {
            value = 'skatepark', -- used for image
            label = 'Skatepark', -- label for the map
            coords = {
                --spawn coords in map for every player (you must add 5 points to every team)
                player = {
                    vec4(-934.22772216797, -782.9326171875, 15.92115688324 - 0.98, 138.37428283691),
                    vec4(-935.90240478516, -781.35418701172, 15.921172142029 - 0.98, 142.44682312012),
                    vec4(-931.87414550781, -784.74267578125, 15.921000480652 - 0.98, 144.81755065918),
                    vec4(-931.37048339844, -780.52319335938, 15.92112827301 - 0.98, 140.92091369629),
                    vec4(-933.23004150391, -779.13861083984, 15.921200752258 - 0.98, 141.53363037109),
                },
                opponent = {
                    vec4(-947.94207763672, -800.45281982422, 15.92111492157 - 0.98, 320.18206787109),
                    vec4(-945.62982177734, -802.22735595703, 15.921119689941 - 0.98, 321.44369506836),
                    vec4(-950.7578125, -798.11444091797, 15.921011924744 - 0.98, 322.46520996094),
                    vec4(-950.61901855469, -802.14154052734, 15.921096801758 - 0.98, 319.28198242188),
                    vec4(-949.26300048828, -803.27624511719, 15.921162605286 - 0.98, 323.28137207031)
                }
            }
        },
    },
}
