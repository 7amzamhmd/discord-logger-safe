import { Client, GatewayIntentBits } from "npm:discord.js@14";

const token = Deno.env.get("DISCORD_TOKEN");

if (!token) {
  console.log("❌ TOKEN NOT FOUND");
  Deno.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("✅ Delete Logger Bot is running");
});

client.on("messageDelete", async (message) => {
  if (!message.guild) return;

  const logChannel = message.guild.channels.cache.find(
    (ch) => ch.name === "deleted-logs"
  );

  if (!logChannel) return;

  await logChannel.send(
    `🗑️ رسالة اتحذفت\n` +
    `👤 العضو: ${message.author?.tag || "غير معروف"}\n` +
    `📍 الروم: ${message.channel}\n` +
    `💬 النص: ${message.content || "مش متاح"}`
  );
});

client.login(token);
