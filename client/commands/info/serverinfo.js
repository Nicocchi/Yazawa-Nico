const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => {
//     const guildRes = await axios.post('http://localhost:8000/guilds/profile', 
//     {'discord_id': message.guild.id, 'name': message.guild.name });
//   const guild = guildRes.data.guild;

    const memberCount = message.guild.memberCount;
    const id = message.guild.id;
    const region = message.guild.region;
    const channelCount = message.guild.channels.cache.size;
    const owner = message.guild.owner.user.username;
    const discriminator = message.guild.owner.user.discriminator;
    const roles = message.guild.roles.cache.map(role => role.name);
    const created = message.guild.createdAt;

  let embed = new MessageEmbed()
  .setAuthor(`${message.guild.name}`, `${message.guild.iconURL()}`)
  .setThumbnail(message.guild.iconURL())
  .setColor("#FF4D9C")
  .setFooter(
    `Created ${created}`
  )
  .addField("ID", `${id}`, true)
  .addField("Region", `${region}`, true)
  .addField("Members", `${memberCount}`, true)
  .addField("Channels", `${channelCount}`, true)
  .addField("Owner", `${owner}#${discriminator}`, true)
  .addField("Roles", `${roles.join(',').replace("@everyone", "everyone")}`, false)
  ;

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "serverinfo",
  category: "Miscelaneous",
  description: "Gives some useful server statistics",
  usage: "serverinfo"
};
