// This event executes when a message is deleted.
const Discord = require("discord.js");
const axios = require("axios");
const moment = require('moment');

module.exports = async (client, channel) => {
  try {
    // Load the guild's settings
    const guildRes = await axios.post('http://localhost:8000/guilds/profile', 
    {'discord_id': channel.guild.id, 'name': channel.guild.name });
    const guild = guildRes.data.guild;

    const modLogChannel = channel.guild.channels.find(ch => ch.id === guild.modLogChannel);

    if (guild.modlog && modLogChannel !== null) {
      try {
        let embed = new Discord.RichEmbed()
          .setDescription(`**Channel Deleted:** ${channel.name}`)
          .setTimestamp()
          .setColor("#FF4D9C");
        
        // Send the deleted message to the modlog channel
        modLogChannel.send(embed).catch(console.error);
      } catch (e) {
        client.logger.error(`[channelDelete.js]: Embed: ${e}`);
        message.channel.send(`Unable to show deleted log due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] [channelDelete.js]: Embed: | ${error.response}\``);
      }
    }

  } catch (e) {
    client.logger.error(`[channelDelete.js]: ${e}`);
  }
};
