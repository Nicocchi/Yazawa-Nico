const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const moment = require("moment");
const axios = require("axios");

//  Description: Resume the currently playing song
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  try {
    if (!message.member.voiceChannel)
      return message.channel.send("You are not in a voice channel.");

      const permissions = message.member.voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send(
        "I can not connect to this voice channel, please make " +
          "sure I have the proper permissions."
      );

    if (!permissions.has("SPEAK"))
      return message.channel.send(
        "I can not speak in this voice channel, " +
          "please make sure I have the proper permissions."
      );

    let serverQueue = client.queue.get(message.guild.id);
    console.dir(serverQueue);

    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return message.channel.send("The music has resumed.");
    } else {
      try {
        // try to load playlist from server
        const res = await axios.post('http://localhost:8000/guilds/playlist', {'discord_id': message.guild.id, 'name': message.guild.name });
        const playlistRes = res.data;
        console.log("[RESUME.js] -> PLAYLIST", playlistRes.playlist);
        const voiceChannel = message.member.voiceChannel;
        console.log("[RESUME.js] -> VC", voiceChannel);

        if (!playlistRes.playlist || playlistRes.playlist === []) return message.channel.send("There is nothing playing.");

        let queueConstruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: playlistRes.playlist,
          volume: 5,
          playing: true
        };

        // console.log("[RESUME.js] -> QUEUE_CONSTRUCT", queueConstruct);
        
        client.queue.set(message.guild.id, queueConstruct);

        try {
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          client.play(message.guild, queueConstruct.songs[0]);
          return;
          // return message.channel.send(`Started Playing: **${queueConstruct.songs[0].title}**`);
        } catch (e) {
          client.logger.error(e);
          client.queue.delete(message.guild.id);
          return message.channel.send(`Unable to resume song due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Play | ${e}\``);
        }
    
      } catch (error) {
        return message.channel.send(`Unable to retrieve playlist due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Retrieve Playlist - Resume | ${error}\``);
      }
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
