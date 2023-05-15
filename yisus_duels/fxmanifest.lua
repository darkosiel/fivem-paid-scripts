fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Yisus#6342 - yisus.store/discord'
ui_page 'web/dist/index.html'

shared_scripts {
    '@ox_lib/init.lua',
    'locale.lua'
}

client_scripts {
    'import.lua',
    'client/bridge/*.lua',
    'client/death.lua',
    'client/main.lua'
}

server_scripts {
    'server/data.lua',
    'server/bridge/*.lua',
    'server/leaderboard.lua',
    'server/main.lua'
}

files {
    'client/data.lua',
    'web/dist/images/**/*.png',
    'web/dist/*.html',
    'web/dist/*.js',
    'web/dist/*.css',
    'web/dist/*.png',
    'web/dist/*.svg',
    'web/dist/*.ttf',
    'web/dist/*.woff',
    'web/dist/*.woff2',
    'web/dist/*.json'
}

escrow_ignore {
    'client/data.lua',
    'client/bridge/*.lua',
    'server/data.lua',
    'server/bridge/*.lua',
    'locale.lua'
}
