// This event executes when a new member leaves a server.
const Discord = require("discord.js");

module.exports = (client, member) => {
  // Load the guild's settings
  const defaults = client.config.defaultSettings;
  if (!client.settings.has(member.guild.id))
    client.settings.set(member.guild.id, defaults);

  const settings = client.settings.get(member.guild.id);
  const username = member.user.username;

  // If leave is off, don't proceed
  if (settings.leaveEnabled) {
    // Replace the placeholders in the leave message with actual data
    const leaveMessage = settings.leaveMessage.replace("<user>", username);

    // Send the leave message to the leave channel
    const greetChannel = member.guild.channels.find(
      c => c.id === settings.leaveChannel
    );
    if (greetChannel) {
      greetChannel.send(leaveMessage).catch(console.error);
    }
  }

  // ModLog
  client.logger.log(settings.modlog);
  if (!settings.modlog) return;
  const modLogChannel = member.guild.channels.find(
    c => c.id === settings.modLogChannel
  );
  if (!modLogChannel) return;
  let embed = new Discord.RichEmbed()
    .setAuthor(`Member Left`)
    .setDescription(`${member.user.username}`)
    .setThumbnail(member.user.avatarURL)
    .setTimestamp()
    .setFooter(`ID: ${member.user.id}`)
    .setColor("#FF4D9C");

  // Send the joined message to the modlog channel
  modLogChannel.send(embed).catch(console.error);
};
