const Discord = require("discord.js");
const ytdl = require("ytdl-core");

//  Description: View the queue
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  message.reply(`Music commands are currently under maintenance.`);
  // try {
  //   const serverQueue = client.queue.get(message.guild.id);
  //   if (!serverQueue) return message.channel.send("There is nothing playing.");
  //   return message.channel.send(`
  //   __**Song Queue:**__
  //   ${serverQueue.songs.map((song, i) => `\n[${i <= 8 ? `0${++i}` : `${++i}`}] - **${song.title}**`).join("")}
  //   \nThere are currently **${serverQueue.songs.length}** songs in queue
  //   \nNow Playing: **${serverQueue.songs[0].title}**
  //   `);
  // } catch (e) {
  //   console.log(e);
  // }

};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: ["q"],
  permLevel: "User"
};

exports.help = {
  name: "queue",
  category: "Music",
  description: "View the queue",
  usage: "queue"
};
