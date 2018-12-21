const Discord = require("discord.js");
const ytdl = require("ytdl-core");

//  Description: View the queue
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  const serverQueue = client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send("There is nothing playing.");
  return message.channel.send(`
  __**Song queue:**__
  ${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}
  
  **Now Playing:** ${serverQueue.songs[0].title}
  `);
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
