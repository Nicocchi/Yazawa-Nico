const Discord = require("discord.js");
const ytdl = require("ytdl-core");

//  Description: Display what is currently playing
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  message.reply(`Music commands are currently under maintenance.`);
  // try {
  //   const serverQueue = client.queue.get(message.guild.id);
  //   if (!serverQueue) return message.channel.send("There is nothing playing.");

  //   message.channel.send(`Now Playing: **${serverQueue.songs[0].title}**`);
  // } catch (e) {
  //   console.log(e);
  // }

};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: ["np"],
  permLevel: "User"
};

exports.help = {
  name: "nowplaying",
  category: "Music",
  description: "Display what is currently playing",
  usage: "nowplaying"
};
