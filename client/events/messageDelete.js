// This event executes when a message is deleted.
const Discord = require("discord.js");
const axios = require('axios');
const Canvas = require('canvas');
const moment = require('moment');

module.exports = async (client, message) => {
  try {
    if (message.member.id === client.user.id) return;
    // Load the guild's settings
    const guildRes = await axios.post('http://localhost:8000/guilds/profile', 
    {'discord_id': message.guild.id, 'name': message.guild.name });
    const guild = guildRes.data.guild;

    const modLogChannel = message.guild.channels.find(ch => ch.id === guild.modLogChannel);

    if (guild.modlog && modLogChannel !== null) {
      try {
        let embed = new Discord.RichEmbed()
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
