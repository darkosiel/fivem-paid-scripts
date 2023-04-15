const gameConfig = {
    weapons: [
        {
            image: '../../dist/images/weapons/WEAPON_PISTOL.png',
            label: 'Pistol',
            value: 'WEAPON_PISTOL'
        },
        {
            image: '../../dist/images/weapons/WEAPON_APPISTOL.png',
            label: 'AP Pistol',
            value: 'WEAPON_APPISTOL'
        }
    ],
    maps: [
        {
            image: '../../dist/images/maps/SKATEPARK.png',
            label: 'Map 1',
            value: 'map1',
        },
        {
            image: '../../dist/images/maps/SKATEPARK.png',
            label: 'Map 2',
            value: 'map2',
        },
        {
            image: '../../dist/images/maps/SKATEPARK.png',
            label: 'Map 3',
            value: 'map3',
        }
    ],
    maxrounds: 5,

}

const lobbies = [
    {
        id: 1,
        created: 1610000000,
        started: false,
        duelmode: '1v1',
        rounds: 1,
        weapon: 'WEAPON_PISTOL',
        map: 'map1',
        password: false,
        team1: [
            {
                id: 1,
                name: 'Player 1',
                kills: 0,
                deaths: 0,
                host: true,
                ready: false,
            },
            {
                id: 2,
                name: 'Player 2',
                kills: 0,
                deaths: 0,
                host: false,
                ready: false,
            }
        ],
        team2: [
            {
                id: 3,
                name: 'Player 3',
                kills: 0,
                deaths: 0,
                host: false,
                ready: false,
            },
            {
                id: 4,
                name: 'Player 4',
                kills: 0,
                deaths: 0,
                host: false,
                ready: false,
            }
        ]
    },
    {
        id: 2,
        created: 1610000000,
        started: false,
        duelmode: '1v1',
        rounds: 1,
        weapon: 'WEAPON_PISTOL',
        map: 'map1',
        password: 'maricon',
        team1: [
            {
                id: 1,
                name: 'Player 1',
                kills: 0,
                deaths: 0,
                host: true,
                ready: false,
            },
        ],
        team2: [
        ]
    },
]

const leaderboard = [
    {
        top: 1,
        name: 'Player 1',
        kills: 0,
        deaths: 0,
        wins: 0,
        loses: 0,
    },
    {
        top: 2,
        name: 'Player 2',
        kills: 0,
        deaths: 0,
        wins: 0,
        loses: 0,
    },
    {
        top: 3,
        name: 'Player 3',
        kills: 0,
        deaths: 0,
        wins: 0,
        loses: 0,
    },
]

const messages = {
    ['nui.duel.create']: '+ Create',
    ['nui.duel.inlobby']: 'In Lobby',
    ['nui.duel.ranking']: 'Ranking',
    ['nui.duel.matches']: 'Matches',
    ['nui.duel.createduel']: 'Create Duel',
    ['nui.duel.duelmode.label']: 'Select Duel Mode',
    ['nui.duel.duelmode.placeholder']: 'Pick desired duel mode',
    ['nui.duel.roundcount.label']: 'Select Number Of Rounds',
    ['nui.duel.roundcount.placeholder']: 'Pick desired number of rounds',
    ['nui.duel.weapon.label']: 'Select Weapon',
    ['nui.duel.weapon.placeholder']: 'Pick desired duel weapon',
    ['nui.duel.weapon.notfound']: 'No weapon found',
    ['nui.duel.map.text']: 'Select an arena',
    ['nui.duel.password.label']: 'Duel Password',
    ['nui.duel.password.description']: 'Put a password to make your duel private, leave empty for public',
    ['nui.duel.create.submit']: 'Create Duel',
    ['nui.duel.rounds']: 'ROUNDS',
    ['nui.duel.open']: 'OPEN',
    ['nui.duel.private']: 'PRIVATE',
    ['nui.duel.host']: 'Host:',
    ['nui.duel.empty']: 'No duel lobbies, yet',
    ['nui.duel.playerlobby']: 'Lobby',
    ['nui.duel.team1']: 'Team 1',
    ['nui.duel.team2']: 'Team 2',
    ['nui.duel.start']: 'Start',
    ['nui.duel.leave']: 'Leave',
    ['nui.duel.join']: 'Join',
    ['nui.duel.noplayers']: 'No players in this team',

    ['nui.lb.top']: 'Top',
    ['nui.lb.name']: 'Player',
    ['nui.lb.kd']: 'K/D',
    ['nui.lb.wl']: 'W/L',

    ['nui.prompt.message']: 'Loading duel...',

    ['nui.match.round']: 'Round',
    ['nui.duel.mustweapon']: 'You must select a weapon',
    ['nui.duel.mustround']: 'You must select a round count',
    ['nui.duel.badround']: 'You can\'t select more than',
    ['nui.password.title']: 'Input Lobby Password',
}

export const mockData = {
    gameConfig,
    lobbies,
    leaderboard,
    messages
}