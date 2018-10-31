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
      "Support Server",
      `[Support Server](https://discord.gg/uWRCmkE)`,
      true
    )
    .addField(`Version`, `v3.0`, true)
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
    .addField(`Moderation`, "`set`", false)
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
  aliases: '["h", "help"]',
  permLevel: "User"
};

exports.help = {
  name: "helpdm",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
