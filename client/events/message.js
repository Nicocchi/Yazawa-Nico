// Runs anytime a message is received
// Note: Due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

const Discord = require("discord.js");
const axios = require('axios');

module.exports = async (client, message) => {
  // Ignore bots
  if (message.author.bot) return;

  // Grab the profile for the server
  const guildRes = await axios.post('http://localhost:8000/guilds/profile', 
    {'discord_id': message.guild.id, 'name': message.guild.name });
  const guild = guildRes.data.guild;

  // Grab the message author's profile
  const userRes = await axios.post('http://localhost:8000/users/profile', 
    {'discord_id': message.author.id, 'name': message.author.username});
  const author = userRes.data.user;

  // Checks if the bot was mentioned, with no message after it, returns the prefix.
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.channel.send(`My prefix in this server is \`${guild.prefix}\``);
  }

  // XP ==================================================================
  // Send user data to gain XP (XP is calculated on server-side)
  // TODO: SET AUTHORIZATION
  if (message.content.length > 10) {
    const xpRes = await axios.post('http://localhost:8000/users/gainxp', 
    {'discord_id': message.author.id, 'name': message.author.username});

  // Check levels in the response
  if (xpRes.data.newLevel > xpRes.data.previousLevel && guild.levelEnabled) {
    message.channel.send(`${message.author.tag}, you have leveld up to 
      ${xpRes.data.newLevel}~`);
  }
  }
  

  // AFK ==================================================================

  // Get a user
  let user = message.guild.member(message.mentions.users.first());

  // If a user was mentioned, get their profile info and check if the
  // user is AFK. If AFK, send the user's AFK message.
  if (user) {
    const mentionedUser = await axios.post('http://localhost:8000/users/profile', {'discord_id': user.user.id, 'name': user.user.username});
    const mentionedProfile = mentionedUser.data.user;

    if (mentionedProfile.afk) {
      let embed = new Discord.RichEmbed()
          .setTitle(`AFK`)
          .setTimestamp()
          .setColor("#FF4D9C")
          .setThumbnail(user.user.avatarURL)
          .setDescription(
            `**${
              user.user.username
            }** is currently away. They left this message:\n\n**${
              mentionedProfile.afkMessage
            }**`
          );
  
        message.channel.send(embed);
    }
  }

  // If the author is AFK, set as back and return message
  try {
    if (author.afk) {
      const profileResults = await axios.post('http://localhost:8000/users/setafk', {
        "discord_id": message.author.id,
        "name": message.author.username,
        "afk_value": false
      });
  
      let embed = new Discord.RichEmbed()
        .setTitle(`AFK`)
        .setTimestamp()
        .setColor("#FF4D9C")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(
          `You are now set as back **${message.author.username}!**`
        );
  
      message.channel.send(embed);
    }
  } catch (error) {
    console.log(error.response.status);
    // client.logger.error(error.response);
  }
  

  // END OF AFK ==================================================================

  // Ignore any message that does not start with the prefix or bot mention
  const prefixMention2 = new RegExp(`^<@!?${client.user.id}> `);
  const prefix = message.content.match(prefixMention2) ? message.content.match(prefixMention2)[0] : guild.prefix;
  if (!message.content.startsWith(prefix)) return;

  // Check if user has talked recently, if so, return
  if (client.talkedRecently.has(message.author.id)) {
    message.channel.send("Currently on cooldown.").then(msg => msg.delete(5000));
    return;
  };

  // Adds the user to the set so that they can't talk for 2.5 seconds
  client.talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user form teh set after 2.5 seconds
    client.talkedRecently.delete(message.author.id);
  }, 2500)

  

  // Seperate the 'command' name, and the 'arguments' for the command.
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  // If the member on a guild is invisible or not cached, fetch them.
  if (message.guild && !message.member)
    await message.guild.fetchMember(message.author);

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd) return;

  // Some commands may not be usable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly) {
    return message.channel.send(
      "This command is unavailable via private message. Please run this command in a guild."
    );
  }

  // Level Permission check
  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (guild.systemNotice === "true") {
      return message.channel
        .send(`You do not have permission to use this command. Your permission level is
                ${level} (${
        client.config.permLevels.find(l => l.level === level).name
      }) This command requires level
                ${client.levelCache[cmd.conf.permLevel]} (${
        cmd.conf.permLevel
      })`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is support in Dms)
  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }

  // If the command exists, **AND** the user has permission, run it
  client.logger.cmd(
    `[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${
      message.author.username
    } (${message.author.id}) ran command ${cmd.help.name}`
  );
  cmd.run(client, message, args, level);
};
