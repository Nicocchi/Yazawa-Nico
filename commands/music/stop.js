const Discord = require("discord.js");
const ytdl = require("ytdl-core");

//  Description: Stop a song from playing
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  if (!message.member.voiceChannel)
    return message.channel.send("You are not in a voice channel.");
  message.member.voiceChannel.leave();
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "stop",
  category: "Music",
  description: "Stop a song from playing",
  usage: "stop"
};
