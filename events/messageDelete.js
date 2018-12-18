// This event executes when a message is deleted.
const Discord = require("discord.js");

module.exports = (client, message) => {
  // Load the guild's settings
  const defaults = client.config.defaultSettings;
  if (!client.settings.has(message.guild.id))
    client.settings.set(message.guild.id, defaults);

  const settings = client.settings.get(message.guild.id);

  // If no modLogChannel, don't proceed
  if (!settings.modlog) return;
  const modLogChannel = message.guild.channels.find(
    c => c.id === settings.modLogChannel
  );
  if (!modLogChannel) return;
  if (message.author.bot) return;

  let embed = new Discord.RichEmbed()
    .setAuthor(`${message.member.user.username}`)
    .setDescription(
      `Message sent by ${message.member} deleted in ${message.channel}\n ${
        message.content
      }`
    )
    .setTimestamp()
    .setThumbnail(message.member.user.avatarURL)
    .setFooter(`ID: ${message.member.id} | ${message.member.joinedAt}`)
    .setColor("#FF4D9C");

  // Send the deleted message to the modlog channel
  modLogChannel.send(embed).catch(console.error);
};
