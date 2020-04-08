const Discord = require("discord.js");
const ytdl = require("ytdl-core");

//  Description: Pause the currently playing song
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  message.reply(`Music commands are currently under maintenance.`);
  // try {
  //   if (!message.member.voiceChannel)
  //     return message.channel.send("You are not in a voice channel.");

  //   const serverQueue = client.queue.get(message.guild.id);
  //   if (serverQueue && serverQueue.playing) {
  //     serverQueue.playing = false;
  //     serverQueue.connection.dispatcher.pause();
  //     return message.channel.send("The music is paused.");
  //   }

  //   return message.channel.send("There is nothing playing.");

  //   serverQueue.playing = false;
  //   serverQueue.connection.dispatcher.pause();
  //   return message.channel.send("The music is paused.");
  // } catch (e) {
  //   console.log(e);
  // }

};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: ["ps"],
  permLevel: "User"
};

exports.help = {
  name: "pause",
  category: "Music",
  description: "Pause the currently playing song",
  usage: "pause"
};
