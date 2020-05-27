// This event executes when a message is deleted.
const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const Canvas = require('canvas');
const moment = require('moment');

module.exports = async (client, message) => {
  try {
    console.log(message.member.id)
    if (message.member.id === client.user.id) return;
    // Load the guild's settings
    const guildRes = await axios.post(`${process.env.BE_URL}/guilds/profile`, 
    {'discord_id': message.guild.id, 'name': message.guild.name });
    const guild = guildRes.data.guild;

    const modLogChannel = message.guild.channels.cache.find(ch => ch.id === guild.modLogChannel);

    const fetchedLogs = await message.guild.fetchAuditLogs({limit: 1, type: 'MESSAGE_DELETE'});

    const deletionLog = fetchedLogs.entries.first();

    if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

    const { executor, target, extra } = deletionLog;

    if (target.id === message.author.id) {
      console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
    }	else {
      console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
    }

    if (guild.modlog && modLogChannel !== null) {
      try {
        let embed = new MessageEmbed()
        .setAuthor(`${message.member.user.username}`)
        .setDescription(
          `Message sent by ${message.member} deleted in ${message.channel}\n ${
            message.content
          }`
        )
        .setTimestamp()
        .setThumbnail(message.member.user.avatarURL)
        .setTimestamp()
        .setColor("#FF4D9C");
        
        // Send the deleted message to the modlog channel
        modLogChannel.send(embed).catch(console.error);
      } catch (e) {
        client.logger.error(`[messageDelete.js]: Embed: ${e}`);
        message.channel.send(`Unable to show delete log due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] [messageDelete.js]: Embed: | ${e.response}\``);
      }
    }

    

  } catch (e) {
    client.logger.error(`[messageDelete.js]: Embed: ${e}`);
  }
};
