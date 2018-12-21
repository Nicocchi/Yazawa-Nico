const Discord = require("discord.js");
const ytdl = require("ytdl-core");

//  Description: Play a song from YouTube
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel)
    return message.reply(`You need to be in a voice channel to play music`);

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT"))
    return message.channel.send(
      "I cannot to voice channel, please make " +
        "sure I have the proper permissions."
    );
  if (!permissions.has("SPEAK"))
    return message.channel.send(
      "I cannot to speack in this voice channel, " +
        "please make sure I have the proper permissions."
    );

  try {
    var connection = await voiceChannel.join();
  } catch (e) {
    client.logger.error(e);
    return message.channel.send("I could not join the voice channel.");
  }

  const dispatcher = connection
    .playStream(ytdl(args[0]))
    .on("end", () => {
      client.logger.log("Song Ended!");
      voiceChannel.leave();
    })
    .on("Error", e => {
      client.logger.error(e);
    });

  dispatcher.setVolumeLogarithmic(5 / 5);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Play a song from YouTube",
  usage: "play <song>"
};
