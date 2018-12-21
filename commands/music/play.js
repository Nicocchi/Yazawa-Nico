const { Discord, Util } = require("discord.js");
const ytdl = require("ytdl-core");

//  Description: Play a song from YouTube
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  const serverQueue = client.queue.get(message.guild.id);

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
      "I cannot to speak in this voice channel, " +
        "please make sure I have the proper permissions."
    );

  const songInfo = await ytdl.getInfo(args[0]);
  const song = {
    title: Util.escapeMarkdown(songInfo.title),
    url: songInfo.video_url,
    thumbnail: songInfo.thumbnail_url
  };

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    client.queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      client.play(message.guild, queueConstruct.songs[0]);
    } catch (e) {
      client.logger.error(`PLAY: ${e}`);
      client.queue.delete(message.guild.id);
      return message.channel.send("I could not join the voice channel.");
    }
  } else {
    serverQueue.songs.push(song);
    message.channel.send(`**${song.title}** has been added to the queue!`);
  }
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: ["p"],
  permLevel: "User"
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Play a song from YouTube",
  usage: "play <song>"
};
