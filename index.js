const mineflayer = require("mineflayer");

function startBot() {
    let reconnecting = false;

    const bot = mineflayer.createBot({
        host: "AssassinPlayZ7-uhBP.aternos.me",
        port: 25565,
        username: "AssassinPlayZ",
        version: "1.21.1"
    });

    bot.on("login", () => {
        console.log("✅ Bot logged in!");
    });

    bot.on("spawn", () => {
        console.log("🎮 Bot spawned!");
    });

    // Prevent duplicate reconnect attempts
    function safeReconnect() {
        if (reconnecting) return;
        reconnecting = true;

        console.log("🔁 Reconnecting in 5 seconds...");
        setTimeout(() => {
            reconnecting = false;
            startBot();
        }, 5000);
    }

    bot.on("end", (reason) => {
        console.log("❌ Bot disconnected:", reason);
        safeReconnect();
    });

    bot.on("kicked", (reason) => {
        console.log("⚠️ Kicked:", reason);
        safeReconnect();
    });

    bot.on("error", (err) => {
        console.log("❗ Error:", err.message);

        // ECONNRESET fix
        if (err.code === "ECONNRESET") {
            console.log("🔌 Connection reset — safe reconnecting...");
            safeReconnect();
        }
    });
}

startBot();
