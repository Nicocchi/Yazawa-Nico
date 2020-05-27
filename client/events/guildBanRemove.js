// This event executes when a message is deleted.
const Discord = require("discord.js");
const axios = require("axios");
const moment = require('moment');

module.exports = async (client, guild, member) => {
  try {
    // console.log("USER", user);
    // Load the guild's settings
    const guildRes = await axios.post(`${process.env.BE_URL}/guilds/profile`, 
    {'discord_id': guild.id, 'name': guild.name });
    const guildr = guildRes.data.guild;

    const modLogChannel = guild.channels.find(ch => ch.id === guildr.modLogChannel);


    if (guild.modlog && modLogChannel !== null || modLogChannel !== "") {
      try {
        let embed = new MessageEmbed()
          .setDescription(`**Ban Revoked:** ${member.username}#${member.discriminator}`)
          .setThumbnail(member.displayAvatarURL)
          .setTimestamp()
          .setColor("#FF4D9C");
        
        // Send the deleted message to the modlog channel
        modLogChannel.send(embed).catch(console.error);
      } catch (e) {
        client.logger.error(`[guildBanRemove.js]: Embed: ${e}`);
        guild.channel.send(`Unable to show ban revoked log due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] [guildBanRemove.js]: Embed | ${e.response}\``);
      }
    }

  } catch (e) {
    client.logger.error(`[guildBanRemove.js]: ${e}`);
  }
};
