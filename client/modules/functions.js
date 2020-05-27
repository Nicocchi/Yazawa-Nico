const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const moment = require("moment");
const axios = require("axios");

module.exports = client => {
  /**
   * PERMISSION LEVEL FUNCTION
   *
   * This is a very basic permission system for commands which uses "levels"
   *
   */

  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels
      .slice(0)
      .sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };

  /**
   * GUILD SETTINGS FUNCTION
   *
   * This function merges the default settings (from config.defaultSettings) with any
   * guild overrides you might have for a particular guild. If no overrides are present,
   * the default settings are used.
   *
   */

  client.getSettings = guild => {
    const defaults = client.config.defaultSettings || {};
    if (!guild) return defaults;
    const guildData = client.settings.get(guild) || {};
    const returnObject = {};
    Object.keys(defaults).forEach(key => {
      returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
    });
    return returnObject;
  };

  /**
   * USER SETTINGS FUNCTION
   *
   * This function merges the default User settings (from config.defaultUserSettings) with any
   * user overrides you might have for a particular user. If no overrides are present,
   * the default settings are used.
   *
   */

  client.getUserSettings = userId => {
    const defaults = client.config.defaultUserSettings || {};
    if (!userId) return defaults;
    const userData = client.settings.get(userId) || {};
    const returnObject = {};
    Object.keys(defaults).forEach(key => {
      returnObject[key] = userData[key] ? userData[key] : defaults[key];
    });
    return returnObject;
  };

  client.getGlobalSettings = () => {
    const defaults = client.config.defaultGlobalSettings || {};
    const globalData = client.settings.get("GlobalSettings") || {};
    const returnObject = {};
    Object.keys(defaults).forEach(key => {
      returnObject[key] = globalData[key] ? globalData[key] : defaults[key];
    });
    return returnObject;
  };

  /**
   * SINGLE-LINE AWAITMESSAGE
   *
   * A simple way to grab a single reply, from the user that initiated
   * the command. Useful to get "precisions" on certain things...
   *
   * USAGE
   *
   * const response = await client.awaitReply(msg, "Favourite Color?");
   * msg.reply(`Oh, I really love ${response} too!);
   *
   */

  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: limit,
        errors: ["time"]
      });
      return collected.first().content;
    } catch (e) {
      msg.channel.send("Aww, you didn't select anything... Nico..");
      return false;
    }
  };

  /**
   * MESSAGE CLEAN FUNCTION
   *
   * "Clean" removes @everyone pings, as well as tokens, and makes code blocks
   * escaped so they're shown more easily. As a bonus it resolves promises
   * and stringifies objects!
   * This is mostly only used by the Eval and Exec commands.
   *
   */

  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise") text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, { depth: 1 });

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(
        client.token,
        "NDYwMjY4MTg5OTY0Njk3NjUw.Dp1dcg.-ZE3jFxpYbR_M2vUOnYURco_qm0"
      );

    return text;
  };

  client.loadCommand = (commandName, dir) => {
    try {
      client.logger.log(`Loading Command: ${commandName}`);

      const props = require(`../${dir}/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);

      props.conf.aliases.forEach(alias => {
        client.logger.log(`Setting Alias: ${alias}`);
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async commandName => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command)
      return `The command \`${commandName}\` doesn\'t seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod = requie.cache[require.resolve(`../commands/${commandName}`)];
    delete require.chache[require.resolve(`../commands/${commandName}.js`)];
    for (let i = o; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };

  /**
   * MUSIC FUNCTIONS
   *
   */

  /**
   * Play the song on Discord Voice Channel
   * @param guild - Server
   * @param song - Song to be played
   * @returns {Promise<void>}
   */
  client.play = async (guild, song) => {
    try {
      // Get the queue
      const serverQueue = client.queue.get(guild.id);

      // If no song, leave the voice channel and delete the guild from the queue
      if (!song) {
        serverQueue.voiceChannel.leave();
        // const res = await axios.post(`${process.env.BE_URL}/guilds/save-playlist`, {'discord_id': guild.id, 'name': guild.name, 'playlist': [] });
        client.queue.delete(guild.id);
        return;
      }

      // Set the dispatcher to start playing the song
      const dispatcher = serverQueue.connection
        .playStream(ytdl(song.url))
        .on("end", () => {
          // Remove the first song from the array
          serverQueue.songs.shift();

          // Recall the function with the next song
          client.play(guild, serverQueue.songs[0]);
        })
        .on("Error", e => {
          client.logger.error(`CLIENT_PLAY: ${e}`);
          serverQueue.textChannel.send(`Error playing song: ${e}`);
        });

      // Set the volume
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

      // Send message to the text channel with the song.
      serverQueue.textChannel.send(`Started Playing: **${song.title}**`);
    } catch (e) {
      console.log(e);
    }
  };

  client.handleVideo = async (
    video,
    message,
    voiceChannel,
    playlist = false
  ) => {
    try {
      const serverQueue = client.queue.get(message.guild.id);
      const song = {
        id: video.id,
        title: video.title,
        url: video.url
      };

      if (!serverQueue) {
        try {
          // try to load playlist from server
          const res = await axios.post(`${process.env.BE_URL}/guilds/playlist`, {'discord_id': message.guild.id, 'name': message.guild.name });
          const playlistRes = res.data;
          // console.log("[FUNCTIONS.js] -> PLAYLIST", playlistRes.playlist);

          let songs = [];
          if (playlistRes.playlist || playlistRes.playlist !== []) songs = playlistRes.playlist;

          console.log("[FUNCTIONS.js] -> SONGS", songs);
          let queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: songs,
            volume: 5,
            playing: true
          };

          // console.log("[FUNCTIONS.js] -> QUEUE_CONSTRUCT", queueConstruct);
          
          client.queue.set(message.guild.id, queueConstruct);

          queueConstruct.songs.push(song);

          try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            client.play(message.guild, queueConstruct.songs[0]);
          } catch (e) {
            client.logger.error(e);
            client.queue.delete(message.guild.id);
            return message.channel.send(`Unable to play song due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Play | ${e}\``);
          }
      
        } catch (error) {
          return message.channel.send(`Unable to retrieve playlist due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Retrieve Playlist | ${error}\``);
        }
        
      } else {
        serverQueue.songs.push(song);
        if (playlist) return;
        return message.channel.send(
          `**${song.title}** has been added to the queue!`
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * MISCELANEOUS NON-CRITICAL FUNCTIONS
   *
   */

  /**
   * Return a random value from the array from a given JSON
   * @param file - the location of the JSON file
   * @returns {Promise<any | any[] | V | V[] | number>}
   */
  client.parseJSON = async file => {
    const fs = require("fs");
    let data = fs.readFileSync(file, "utf8");
    data = data.trim();
    const arr = JSON.parse(data).file;
    const result = arr[Math.floor(Math.random() * arr.length)];
    return result;
  };

  /**
   * Return a random number from the given minimum and maximum
   * @param min - minimum amount
   * @param max - maximum mount
   * @returns {number}
   */
  client.randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  /**
   * <String>.toPropercase() returns a proper-cased string such as:
   * "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
   */
  Object.defineProperty(String.prototype, "toProperCase", {
    value: function() {
      return this.replace(
        /([^\W_]+[^\s-]*) */g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    }
  });

  /**
   * <Array>.random() returns a single random element from an array
   * [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5
   */
  Object.defineProperty(Array.prototype, "random", {
    value: function() {
      return this[Math.floor(Math.random() * this.length)];
    }
  });

  /**
   * `await client.wait(1000);` to "pause" for 1 second
   */
  client.wait = require("util").promisify(setTimeout);

  /**
   * These 2 process methods will catch execptions and give *more details* about the error and stack trace.
   */
  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    client.logger.error(`Unhandled rejection: ${err}`);
  });
};
