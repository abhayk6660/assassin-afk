const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: 'AssassinPlayZ7-uhBP.aternos.me', // your server
    port: 25565,
    username: 'AssassinPlayZ',             // bot name
    version: '1.21.1'                      // FORCE Minecraft version
  })

  bot.once('spawn', () => {
    console.log('✅ Bot joined the server (1.21.1).')
    bot.clearControlStates() // stay AFK
    try { bot._client.socket.setKeepAlive(true) } catch (e) {}
  })

  bot.on('kicked', reason => {
    console.log('⚠️ Kicked:', reason)
  })

  bot.on('error', err => {
    console.log('❌ Error:', err.message)
  })

  bot.on('end', () => {
    console.log('🔄 Disconnected. Reconnecting in 5 seconds...')
    setTimeout(startBot, 5000)
  })
}

startBot()
