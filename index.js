const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: 'AssassinPlayZ7-uhBP.aternos.me', // your server
    port: 25565,
    username: 'AssassinPlayZ',             // bot name
    version: false                         // auto-detect server version
  })

  bot.once('spawn', () => {
    console.log('✅ Bot joined the server.')
    bot.clearControlStates() // stay AFK, no movement

    // Keep connection alive (prevents some disconnects)
    try { bot._client.socket.setKeepAlive(true) } catch (e) {}
  })

  bot.on('kicked', (reason) => {
    console.log('⚠️ Kicked:', reason)
  })

  bot.on('error', (err) => {
    console.log('❌ Error:', err.message)
  })

  bot.on('end', () => {
    console.log('🔄 Lost connection. Reconnecting in 5 seconds...')
    setTimeout(startBot, 5000)
  })
}

startBot()
