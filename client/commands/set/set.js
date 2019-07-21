/**
 * This command is to modify/edit guild configuration. Perm Level 3 for admins
 * and owners only. Used for changing prefixes and role names and such.
 *
 * Note that there's no "checks" in this basic version - no config "types" like
 * Role, String, Int, etc... It's basic, to be extended with your deft hands!
 *
 * Note the **destructuring** here. instead of `args` we have :
 * [action, key, ...value]
 * This gives us the equivalent of either:
 * const action = args[0]; const key = args[1]; const value = args.slice(2);
 * OR the same as:
 * const [action, key, ...value] = args;
 *
 */

 const axios = require('axios');

exports.run = async (client, message, args, level) => {
  // Grab the profile for the server
  const guildRes = await axios.post('http://localhost:8000/guilds/profile', 
    {'discord_id': message.guild.id, 'name': message.guild.name });
  const guild = guildRes.data.guild;

  // Check user's permission, if they don't have permission, return message
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "Can't edit guild configuration because you don't have permission"
    );

  // Set the key and action (key = module name, action = setting to save)
  const key = args[0];
  const action = args.slice(1).join(" ");

  // If no key, return message
  if (!key || key === "undefined")
    return message.reply(
      `Please specify a module or use '${
        guild.prefix
      }set get' to get the current guild settings`
    );

  // If no action, return message
  if (action === "undefined" && key !== "get")
    return message.reply("Please specify an action");

  // MODULES

  // BAN
  if (key === "warningsban") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-ban', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'warningsBan': action });

      message.channel.send(res.data.message);
    } catch (error) {
      if (typeof(action) !== Number) {
        return message.channel.send(`:x: Unable to set ban warnings amount due to an error. \n\`${action} is not a number\``);
      }

      message.channel.send(`:x: Unable to set ban warnings amount due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  // MUTE
  if (key === "warningsmute") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-mute', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'warningsMute': action });

      message.channel.send(res.data.message);
    } catch (error) {
      if (typeof(action) !== Number) {
        return message.channel.send(`:x: Unable to set mute warnings amount due to an error. \n\`${action} is not a number\``);
      }

      message.channel.send(`Unable to set mute warnings amount due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  // LEVEL
  if (key === "level") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-level', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'levelEnabled': action });

      message.channel.send(res.data.message);
    } catch (error) {
      if (typeof(action) !== Boolean) {
        return message.channel.send(`:x: Unable to set level preference due to an error. \n\`${action} is not a boolean\``);
      }

      message.channel.send(`Unable to set level preference due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  // LEAVE
  if (key === "leave") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-leave', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'leaveEnabled': action });

      message.channel.send(res.data.message);
    } catch (error) {
      if (typeof(action) !== Boolean) {
        return message.channel.send(`:x: Unable to set leave preference due to an error. \n\`${action} is not a boolean\``);
      }

      message.channel.send(`Unable to set leave preference due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  if (key === "leavemessage") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-leave-message', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'leaveMessage': action });

      message.channel.send(res.data.message);
    } catch (error) {

      message.channel.send(`Unable to set leave message due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  if (key === "leavechannel") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-leave-channel', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'leaveChannel': action });

      message.channel.send(res.data.message);
    } catch (error) {
      message.channel.send(`Unable to set leave channel due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  // WELCOME
  if (key === "welcome") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-welcome', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'welcomeEnabled': action });

      message.channel.send(res.data.message);
    } catch (error) {
      if (typeof(action) !== Boolean) {
        return message.channel.send(`:x: Unable to set welcome preference due to an error. \n\`${action} is not a boolean\``);
      }

      message.channel.send(`Unable to set welcome preference due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  if (key === "welcomemessage") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-welcome-message', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'welcomeMessage': action });

      message.channel.send(res.data.message);
    } catch (error) {
      message.channel.send(`Unable to set welcome message due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  if (key === "welcomeimgmessage") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-welcome-img-message', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'welcomeMessage': action });

      message.channel.send(res.data.message);
    } catch (error) {
      message.channel.send(`Unable to set welcome image message due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  if (key === "welcomechannel") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-welcome-channel', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'welcomeChannel': action });

      message.channel.send(res.data.message);
    } catch (error) {
      message.channel.send(`Unable to set welcome channel due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  // MODLOG
  if (key === "modlog") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-modlog', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'modlog': action });

      message.channel.send(res.data.message);
    } catch (error) {
      if (typeof(action) !== Boolean) {
        return message.channel.send(`:x: Unable to set modlog preference due to an error. \n\`${action} is not a boolean\``);
      }

      message.channel.send(`Unable to set modlog preference due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  if (key === "modlogchannel") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-modlog-channel', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'modlogChannel': action });

      message.channel.send(res.data.message);
    } catch (error) {
      message.channel.send(`Unable to set modlog channel due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  // MOD ROLE
  if (key === "modrole") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-modrole', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'modrole': action });

      message.channel.send(res.data.message);
    } catch (error) {
      message.channel.send(`Unable to set modrole due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  // ADMIN ROLE
  if (key === "adminrole") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-adminrole', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'adminrole': action });

      message.channel.send(res.data.message);
    } catch (error) {
      message.channel.send(`Unable to set adminrole due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
  }

  // PREFIX
  if (key === "prefix") {
    try {
      const res = await axios.post('http://localhost:8000/guilds/set-prefix', 
      {'discord_id': message.guild.id, 'name': message.guild.name, 'prefix': action });


      message.channel.send(res.data.message);
    } catch (error) {
      message.channel.send(`Unable to set prefix due to an error. If encountered, please send to developers.\n\`${error}\``);
    }
    
  }

  // GET
  if (key === "get") {
    const array = [];
    Object.entries(guild).forEach(([key, value]) => {
      array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`);
    });
    await message.channel.send(
      `= Current Guild Settings =\n${array.join("\n")}`,
      { code: "asciidoc" }
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings", "conf"],
  permLevel: "User"
};

exports.help = {
  name: "set",
  category: "System",
  description: "View or change settings for your server.",
  usage: "set <view/get/edit> <key> <value>"
};
