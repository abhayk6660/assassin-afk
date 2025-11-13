// Simple AFK bot — connects, stays still, no login commands, auto-reconnect

const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'AssassinPlayZ7-uhBP.aternos.me', // your server
    port: 25565,
    username: 'AssassinPlayZ',             // bot name
    version: false                         // auto-detect fixes protocol mismatch
  });

  bot.once('spawn', () => {
    console.log('✅ Bot joined the server.');
    bot.clearControlStates(); // do NOT move
    try { bot._client.socket.setKeepAlive(true); } catch (e) {}
  });

  bot.on('error', (err) => {
    console.log('❌ Error:', err.message);
  });

  bot.on('kicked', (reason) => {
    console.log('⚠️ Kicked:', reason);
  });

  bot.on('end', () => {
    console.log('🔄 Disconnected. Reconnecting in 5 seconds...');
    setTimeout(startBot, 5000);
  });
}

startBot();
