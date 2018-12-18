// This event executes when a new member joins a server.
const Discord = require("discord.js");

module.exports = (client, member) => {
  // Load the guild's settings
  const defaults = client.config.defaultSettings;

  if (!client.settings.has(member.guild.id))
    client.settings.set(member.guild.id, defaults);

  const settings = client.settings.get(member.guild.id);

  // If welcome is off, don't proceed
  if (settings.welcomeEnabled) {
    // Replace the placeholders in the welcome message with actual data
    const welcomeMessage = settings.welcomeMessage
      .replace("<user>", `<@${member.user.id}>`)
      .replace("<guild>", `${member.guild.name}`);

    // Send the welcome message to the welcome channel
    const greetChannel = member.guild.channels.find(
      c => c.id === settings.welcomeChannel
    );
    if (greetChannel) {
      greetChannel.send(welcomeMessage).catch(console.error);
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
    .setAuthor(`Member Joined`)
    .setDescription(`${member.user.username}`)
    .setThumbnail(member.user.avatarURL)
    .setTimestamp()
    .setFooter(`ID: ${member.user.id}`)
    .setColor("#FF4D9C");

  // Send the joined message to the modlog channel
  modLogChannel.send(embed).catch(console.error);
};
