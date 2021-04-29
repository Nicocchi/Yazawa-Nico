//  Description: warn a mentioned user.
//  Usage: warn <user> <reason>
const Discord = require("discord.js");
// const fs = require('fs');
// const ms = require('ms');
// let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

exports.run = async (client, message, args, level) => {
    // const defaults = client.config.defaultSettings;
    // if (!client.settings.has(message.guild.id))
    //     client.settings.set(message.guild.id, defaults);
    // const settings = client.settings.get(message.guild.id);
    //
    // if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You can not do that');
    // let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    // if(!user) return message.reply("Couldn't find them yo");
    //
    // let warnings = settings.warnings;
    // let warnlevel = warnings[user.id].warns;
    //
    // message.reply(`${user.user.username} has ${warnlevel} warnings.`);
};

exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "warnlevel",
    category: "System",
    description: "warns a mentioned user",
    usage: "warnlevel <user>"
};