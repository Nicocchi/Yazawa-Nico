const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const axios = require("axios");
const moment = require("moment");
//  Description: Skip a song from the queue
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  try {
    return message.channel.send("Music is currently under maintenance. Sorry for the inconvenience.")
    if (!message.member.voiceChannel)
      return message.channel.send("You are not in a voice channel.");

    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send(
        "There is nothing playing that I could skip for you."
      );

    try {
      const song = serverQueue.songs[0].title;
      // console.log(serverQueue);
      let songQueue = serverQueue.songs;
      songQueue.shift();
      console.log(songQueue);

      const res = await axios.post('http://localhost:8000/guilds/save-playlist', {'discord_id': message.guild.id, 'name': message.guild.name, 'playlist': songQueue });
      console.log(res.data);

      message.channel.send(`**${song}** was skipped.`);
      
      serverQueue.connection.dispatcher.end();

      
    } catch (error) {
      message.channel.send(`Error skipping ${error}`);
    }
    

    
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
  name: "skip",
  category: "Music",
  description: "Skip a song from the queue",
  usage: "skip"
};
