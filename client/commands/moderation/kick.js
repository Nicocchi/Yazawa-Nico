const Discord = require("discord.js");
const axios = require('axios');

//  Description: kick a mentioned user.
//  Usage: ban <user> <reason>
exports.run = async (client, message, args, level) => {
    try {
        // Get mentioned user, if none, return error
    let user = message.guild.member(message.mentions.users.first());
    if(!user) return message.channel.send(`:x: Unable to kick user **undefined** due to an error.\n \`You must mention a user to kick\``);

    // Check if author has proper permissions
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`:x: Unable to kick user **${user.user.username}** due to an error.\n \`You do not have the required permission: 'KICK_MEMBERS'\``);
    
    // Get reason. If none set, set default reason
    let reason = args.join(' ').slice(22);
    if (reason === '') reason = 'No reason given'

    const username = `${user.user.username}#${user.user.discriminator}`

    user.kick(reason).then(() => {
        message.channel.send(`Kicked ${username}`)
    }).catch(err => {
        message.channel.send(`Unable to kick ${username}`)
    })

    } catch (error) {
        client.logger.error(error);
        message.channel.send(`Unable to show kick log due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Kick Log | ${error.response}\``);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "kick",
    category: "System",
    description: "Kicks a mentioned user",
    usage: "kick <user> <reason>"
};