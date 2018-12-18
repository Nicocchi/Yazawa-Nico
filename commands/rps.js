const Discord = require("discord.js");

//  Description: Play a game of RPS
//  Usage: rps
exports.run = async (client, message, args, level) => {
  const defaults = client.config.defaultUserSettings;
  if (!client.settings.has(message.author.id))
    client.settings.set(message.author.id, defaults);
  let settings = client.getUserSettings(message.author.id);

  let amount = args[0];

  if (!settings.isRPS) {
    let embed = new Discord.RichEmbed()
      .addField(
        "Let's play a game",
        "Choose between **rock**, **paper**, or **scissors**.\n\n((≡|≡))_／ ＼_((≡|≡) )"
      )
      .setColor("#FF4D9C");

    if (amount) {
      if (settings.points >= amount) {
        let loveGems = (settings.points -= amount);

        client.settings.set(message.author.id, loveGems, "points");
        client.settings.set(message.author.id, true, "isRPSGamble");
        client.settings.set(message.author.id, amount, "gambleAmount");
      } else {
        return message.reply("You do not have enough love gems to play~");
      }
    }

    client.settings.set(message.author.id, true, "isRPS");

    message.channel.send({ embed: embed });
  } else {
    message.reply("You are already playing RPS!");
  }
};

exports.conf = {
  enabled: "false",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "rps",
  category: "Games",
  description: "Play a game of RPS",
  usage: "rps"
};
