const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const moment = require("moment");
const axios = require("axios");

//  Description: Stop a song from playing
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
      console.log(serverQueue.songs);
      const res = await axios.post('http://localhost:8000/guilds/save-playlist', {'discord_id': message.guild.id, 'name': message.guild.name, 'playlist': serverQueue.songs });
      console.log(res.data.message);
      
      // serverQueue.connection.dispatcher.stop();
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
  
    } catch (error) {
      message.channel.send(`Unable to save playlist due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Save Playlist | ${error.response}\``);
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
  name: "stop",
  category: "Music",
  description: "Stop a song from playing",
  usage: "stop"
};
