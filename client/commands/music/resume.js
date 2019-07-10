const Discord = require("discord.js");
const ytdl = require("ytdl-core");

//  Description: Resume the currently playing song
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  try {
    if (!message.member.voiceChannel)
      return message.channel.send("You are not in a voice channel.");

    const serverQueue = client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return message.channel.send("The music has resumed.");
    }

    return message.channel.send("There is nothing playing.");
  } catch (e) {
    console.log(e);
  }

};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: ["r"],
  permLevel: "User"
};

exports.help = {
  name: "resume",
  category: "Music",
  description: "Resume the currently playing song",
  usage: "resume"
};
