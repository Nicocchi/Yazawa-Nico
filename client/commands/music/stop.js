const Discord = require("discord.js");
const ytdl = require("ytdl-core");

//  Description: Stop a song from playing
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  try {
    if (!message.member.voiceChannel)
      return message.channel.send("You are not in a voice channel.");

    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send(
        "There is nothing playing that I could skip for you."
      );

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  } catch (e) {
    console.log(e);
  }
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
