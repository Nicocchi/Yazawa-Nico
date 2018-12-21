const Discord = require("discord.js");
const ytdl = require("ytdl-core");

//  Description: View and change the volume
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  if (!message.member.voiceChannel)
    return message.channel.send("You are not in a voice channel.");

  const serverQueue = client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send("There is nothing playing.");
  if (!args[0])
    return message.channel.send(`The current volume is ${serverQueue.volume}`);
  serverQueue.volume = args[0];
  serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);

  message.channel.send(`Volume set to ${args[0]}`);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: ["vol"],
  permLevel: "User"
};

exports.help = {
  name: "volume",
  category: "Music",
  description: "View and change the volume",
  usage: "volume <value>"
};
