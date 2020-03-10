//  Description: Displays all the available commands for your permission level.
//  Usage: prefix arg1 arg2
const { MessageEmbed } = require("discord.js");
const axios = require('axios');

exports.run = async (client, message, args, level) => {
  const guildRes = await axios.post('http://localhost:8000/guilds/profile', 
    {'discord_id': message.guild.id, 'name': message.guild.name });
  const guild = guildRes.data.guild;

  let embed = new MessageEmbed()
  .setAuthor(`${client.user.username}'s Commands`, `${client.user.avatarURL()}`)
  .setDescription(
    `Nico Nico Nii~ Here is a list of all the commands I can do~`
  )
  .setTimestamp()
  .setColor("#FF4D9C")
  .setFooter(
    `Server member since ${message.member.joinedAt}`,
    message.author.displayAvatarURL()
  )
  .addField("Prefix", `${guild.prefix}`, true)
  .addField(
    "Support | Invite",
    `[Support](https://discord.gg/cs9Sv8N) | [Invite](https://discordapp.com/oauth2/authorize?client_id=506839796921139203&scope=bot&permissions=2146827775)`,
    true
  )
  .addField(`Version`, `v3.6`, true)
  .addField(`Core`, "`help`, `helpdm`", false)
  .addField(
    `Images`,
    "`angry`, `bad`, `badass`, `bite`, `blush`, `congrats`, `cry`, `cuddle`, `evil`, `excited`, `highfive`, `hug`, " +
      "`kiss`, `laugh`, `lewd`, `lick`, `niconii`, `no`, `nosebleed`, `pat`, `peek`, `poke`, `sad`, `scared`, " +
      "`slap`, `sleepy`, `tantrum`, `washi`, `wasted`, `wow`, `yes`",
    false
  )
  .addField(`Currency`, "`daily`, `send`", false)
  .addField(
    `Fun`,
    "`choose`, `cucumber`, `divorce`, `give`, `marry`, `notice`, `rip`, `say`, `senpai`, `wisdom`",
    false
  )
  .addField(`Profile`, "`profile`, `background`, `pfinfo`, `avatar`, `afk`", false)
  .addField(`Games`, "`8ball`, `rps`", false)
  .addField(`Moderation`, "`ban`, `clear`, `kick`, `set`, `warn` ", false)
  .addField(
    `Music`,
    "`nowplaying` | `q`, `pause` | `ps`, `play` | `p`, `queue` | `q`, `resume`, `skip`, `stop`, `volume` | `vol`",
    false
  )
  .addField(
    `Set`,
    "`adminrole`, `get`, `leave`, `leavechannel`, `leavemessage`, `level`,`modlog`, " +
      "`modlogchannel`, `modrole`, `prefix`, `warningsban`, `warningsmute`, `welcome`, `welcomechannel`, " +
      "`welcomemessage`, `welcometest` "
  );

  message.channel.send(embed);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: ["h", "help"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
