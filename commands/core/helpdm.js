//  Description: Displays all the available commands for your permission level.
//  Usage: prefix arg1 arg2
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  const defaults = client.config.defaultSettings;
  if (!client.settings.has(message.guild.id))
    client.settings.set(message.guild.id, defaults);
  const settings = client.settings.get(message.guild.id);

  let embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}'s Commands`, `${client.user.avatarURL}`)
    .setDescription(
      `Nico Nico Nii~ Here is a list of all the commands I can do~`
    )
    .setTimestamp()
    .setColor("#FF4D9C")
    .setFooter(
      `Server member since ${message.member.joinedAt}`,
      message.author.displayAvatarURL
    )
    .addField("Prefix", `${settings.prefix}`, true)
    .addField(
      "Support | Invite",
      `[Support](https://discord.gg/cs9Sv8N) | [Invite](https://discordapp.com/oauth2/authorize?client_id=506839796921139203&scope=bot&permissions=2146827775)`,
      true
    )
    .addField(`Version`, `v3.1`, true)
    .addField(`Core`, "`help`, `helpdm`", false)
    .addField(
      `Images`,
      "`angry`, `bad`, `badass`, `bite`, `blush`, `congrats`, `cry`, `cuddle`, `evil`, `excited`, `highfive`, `hug`, " +
        "`kiss`, `laugh`, `lewd`, `lick`, `niconii`, `no`, `nosebleed`, `pat`, `peek`, `poke`, `sad`, `scared`, " +
        "`slap`, `sleepy`, `tantrum`, `washi`, `wasted`, `wow`, `yes`",
      false
    )
    .addField(`Currency`, "`daily`, `profile`, `send`", false)
    .addField(
      `Fun`,
      "`choose`, `cucumber`, `divorce`, `give`, `marry`, `notice`, `rip`, `say`, `senpai`, `wisdom`",
      false
    )
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
        "`welcomemessage` "
    )
    .addField(
      `Info`,
      "`afk`, `avatar`, `botinfo`, `userinfo`, `serverinfo`",
      false
    );

  message.author.send(embed);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: ["h", "help"],
  permLevel: "User"
};

exports.help = {
  name: "helpdm",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
