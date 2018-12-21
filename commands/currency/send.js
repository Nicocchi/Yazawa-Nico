const Discord = require("discord.js");
const moment = require("moment");

//  Description: Send some love gems to a user
//  Usage: send arg1
exports.run = async (client, message, args, level) => {
  // Get Author Settings
  const defaults = client.config.defaultUserSettings;

  if (!client.settings.has(message.author.id))
    client.settings.set(message.author.id, defaults);
  let settings = client.getUserSettings(message.author.id);

  // Set user
  const user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  if (!user) return message.reply("You need to specify a user to send to~");

  // Set amount
  const amount = args[1];
  if (!amount) return message.reply("You need to specify an amount to send~");

  // If our love gems are smaller than amount, return error
  if (settings.points < amount)
    return message.reply("Sorry, you do not have enough love gems~");

  // Set User
  if (!client.settings.has(user.user.id))
    client.settings.set(user.user.id, defaults);

  let userSettings = client.getUserSettings(user.user.id);

  // Set love gems
  let userGems = userSettings.points;
  let authorGems = settings.points;
  userGems += parseInt(amount);
  authorGems -= parseInt(amount);

  // Save the new love gems to the user's db
  client.settings.set(user.user.id, userGems, "points");
  client.settings.set(message.author.id, authorGems, "points");

  message.channel.send(
    `:white_check_mark: ${message.author.username}, you sent ${amount} to ${
      user.user.username
    }`
  );
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "send",
  category: "Currency",
  description: "Send some love gems to a user",
  usage: "send <user> [amount]"
};
