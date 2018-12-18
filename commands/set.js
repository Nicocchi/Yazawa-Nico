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
exports.run = async (client, message, args, level) => {
  // Retrieve current guild settings (merged) and overrides only.
  // const settings = message.settings;
  const defaults = client.config.defaultSettings;
  if (!client.settings.has(message.guild.id))
    client.settings.set(message.guild.id, defaults);

  const settings = client.settings.get(message.guild.id);

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
        settings.prefix
      }set get' to get the current guild settings`
    );

  // If no action, return message
  if (action === "undefined" && key !== "get")
    return message.reply("Please specify an action");

  // MODULES

  // BAN
  if (key === "warningsban") {
    client.settings.set(message.guild.id, action, "warningsBan");
    message.reply(`Warnings amount for ban has been set to **${action}**`);
  }

  // MUTE
  if (key === "warningsmute") {
    client.settings.set(message.guild.id, action, "warningsMute");
    message.reply(`Warnings amount for mute has been set to **${action}**`);
  }

  // LEVEL
  if (key === "level") {
    client.settings.set(message.guild.id, action, "levelEnabled");
    message.reply(`Level message has been set to **${action}**`);
  }

  // LEAVE
  if (key === "leave") {
    client.settings.set(message.guild.id, action, "leaveEnabled");
    message.reply(`Leave message has been set to **${action}**`);
  }

  if (key === "leavemessage") {
    client.settings.set(message.guild.id, action, "leaveMessage");
    message.reply(`Leave message has been set to **${action}**`);
  }

  if (key === "leavechannel") {
    client.settings.set(message.guild.id, action, "leaveChannel");
    message.reply(`Leave channel has been set to **${action}**`);
  }

  // WELCOME
  if (key === "welcome") {
    client.settings.set(message.guild.id, action, "welcomeEnabled");
    message.reply(`welcome message has been set to **${action}**`);
  }

  if (key === "welcomemessage") {
    client.settings.set(message.guild.id, action, "welcomeMessage");
    message.reply(`welcome message has been set to **${action}**`);
  }

  if (key === "welcomechannel") {
    client.settings.set(message.guild.id, action, "welcomeChannel");
    message.reply(`welcome channel has been set to **${action}**`);
  }

  // MODLOG
  if (key === "modelogchannel") {
    client.settings.set(message.guild.id, action, "modLogChannel");
    message.reply(`ModLog channel has been set to **${action}**`);
  }

  // MOD ROLE
  if (key === "modrole") {
    client.settings.set(message.guild.id, action, "modRole");
    message.reply(`Mod role has been set to **${action}**`);
  }

  // ADMIN ROLE
  if (key === "adminrole") {
    client.settings.set(message.guild.id, action, "adminRole");
    message.reply(`Admin role has been set to **${action}**`);
  }

  // PREFIX
  if (key === "prefix") {
    client.settings.set(message.guild.id, action, "prefix");
    message.reply(`Prefix has been set to **${action}**`);
  }

  // GET
  if (key === "get") {
    const array = [];
    Object.entries(settings).forEach(([key, value]) => {
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
