require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Secure bot logged in as ${client.user.tag}`);
});

client.on('messageDelete', async (message) => {
  if (!message.guild) return;
  if (!message.author || message.author.bot) return;

  const logChannel = message.guild.channels.cache.find(
    c => c.name === 'deleted-logs'
  );

  if (!logChannel) return;

  logChannel.send({
    embeds: [{
      title: '🗑️ Deleted Message',
      color: 0xcc0000,
      fields: [
        { name: 'User', value: message.author.tag },
        { name: 'Channel', value: `${message.channel}` },
        { name: 'Content', value: message.content || 'Not Available' }
      ],
      timestamp: new Date()
    }]
  });
});

client.login(process.env.TOKEN);
