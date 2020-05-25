const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const axios = require("axios");

//  Description: Propose to a user
//  Usage: marry arg1
exports.run = async (client, message, args, level) => {
  // Get proposed user
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  try {
    // Set the marriage proposal
  const res = await axios.post('http://localhost:8000/users/marry', {'discord_id': message.author.id, 'name': message.author.username, 'mentioned_id': user.id, 'mentioned_name': user.displayName });
  const userProfile = res.data;

  // Grab the profile for the server
  const guildRes = await axios.post('http://localhost:8000/guilds/profile', 
    {'discord_id': message.guild.id, 'name': message.guild.name });
  const guild = guildRes.data.guild;
  if (!guild) {
    guild = {
      prefix: "!"
    }
  }

  // If user is the author, return error
  if (user.user.id === message.author.id)
    return message.channel.send("You... seriously tried to marry yourself?");
  
  if (user.user.id === client.user.id)
    return message.channel.send(">///< I appreciate you being my fan... but... sorry! Idol's are pure! But please stay my fan forever!");

    // console.log(userProfile);

    let embed = new MessageEmbed()
    .setAuthor(`${message.author.username} has proposed to ${user.user.username}`, `${message.author.displayAvatarURL()}`)
      .addField(
        `_ _`,
        userProfile.message,
        false
      )
      .addField(
        ":white_check_mark: To accept",
        `${guild.prefix}acceptmarriage @${message.author.username}`,
        true
      )
      .addField(
        ":negative_squared_cross_mark: To decline",
        `${guild.prefix}declinemarriage @${message.author.username}`,
        true
      )
      .setColor("#FF4D9C");

      message.channel.send({ embed: embed });
  } catch (error) {
    message.channel.send(`Unable to complete marriage due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Marry | ${error}\``);
  }
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "marry",
  category: "Fun",
  description: "Propose to a user",
  usage: "marry <user>"
};
