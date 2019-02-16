// This event executes when a message is deleted.
const Discord = require("discord.js");

module.exports = (client, channel) => {
  // Load the guild's settings
  try {
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
    try {
      let embed = new Discord.RichEmbed()
        .setDescription(`Channel Created: <#${channel.name}>`)
        .setTimestamp()
        .setColor("#FF4D9C");

      // Send the deleted message to the modlog channel
      modLogChannel.send(embed).catch(console.error);
    } catch (e) {
      client.logger.error(e);
    }
  } catch (e) {
    client.logger.error(e);
  }
};
