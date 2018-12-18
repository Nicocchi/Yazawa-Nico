// This event executes when a message is deleted.
const Discord = require("discord.js");

module.exports = (client, channel) => {
  client.logger.log(client.user.username);
  // Load the guild's settings
  const defaults = client.config.defaultSettings;
  if (!client.settings.has(channel.guild.id))
    client.settings.set(channel.guild.id, defaults);

  const settings = client.settings.get(channel.guild.id);

  // If no modLogChannel, don't proceed
  if (!settings.modlog) return;
  const modLogChannel = channel.guild.channels.find(
    c => c.id === settings.modLogChannel
  );

  if (!modLogChannel) return;

  let embed = new Discord.RichEmbed()
    .setDescription(`Channel Created: <#${channel.id}>`)
    .setTimestamp()
    .setColor("#FF4D9C");

  // Send the deleted message to the modlog channel
  modLogChannel.send(embed).catch(console.error);
};
