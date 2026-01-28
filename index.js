const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log('Delete Logger Bot is running');
});

client.on('messageDelete', message => {
  if (!message.guild) return;

  const logChannel = message.guild.channels.cache.find(
    ch => ch.name === 'deleted-logs'
  );
  if (!logChannel) return;

  logChannel.send(
    `🗑️ رسالة اتحذفت\n` +
    `👤 العضو: ${message.author?.tag || 'غير معروف'}\n` +
    `📍 الروم: ${message.channel}\n` +
    `💬 النص: ${message.content || 'مش متاح'}`
  );
});

client.login(process.env.TOKEN);
