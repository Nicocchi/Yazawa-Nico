const Discord = require("discord.js");
const ytdl = require("ytdl-core");

//  Description: Skip a song from the queue
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  if (!message.member.voiceChannel)
    return message.channel.send("You are not in a voice channel.");

  const serverQueue = client.queue.get(message.guild.id);
  if (!serverQueue)
    return message.channel.send(
      "There is nothing playing that I could skip for you."
    );

  message.channel.send(`${serverQueue.songs[0].title} was skipped.`);

  serverQueue.connection.dispatcher.end();
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "skip",
  category: "Music",
  description: "Skip a song from the queue",
  usage: "skip"
};
