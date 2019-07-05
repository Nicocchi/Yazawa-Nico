// This event executes when a message is deleted.
const Discord = require("discord.js");
const axios = require("axios");
const moment = require('moment');

module.exports = async (client, guild, member) => {
  try {
    // console.log("USER", user);
    // Load the guild's settings
    const guildRes = await axios.post('http://localhost:8000/guilds/profile', 
    {'discord_id': guild.id, 'name': guild.name });
    const guildr = guildRes.data.guild;

    const modLogChannel = guild.channels.find(ch => ch.id === guildr.modLogChannel);
    // console.log(modLogChannel);

    if (guild.modlog && modLogChannel !== null || modLogChannel !== "") {
      try {
        let embed = new Discord.RichEmbed()
          .setDescription(`**Member Banned:** ${member.username}#${member.discriminator}`)
          .setThumbnail(member.displayAvatarURL)
          .setTimestamp()
          .setColor("#FF4D9C");
        
        // Send the deleted message to the modlog channel
        modLogChannel.send(embed).catch(console.error);
      } catch (e) {
        client.logger.error(`[guildBanAdd.js]: Embed: ${e}`);
        guild.channel.send(`Unable to show member banned log due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] [guildBanAdd.js]: | ${error.response}\``);
      }
    }

  } catch (e) {
    client.logger.error(`[guildBanAdd.js]: ${e}`);
  }
};
