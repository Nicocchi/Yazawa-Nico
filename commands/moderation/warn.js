const Discord = require("discord.js");
const axios = require('axios');
const fs = require('fs');
const ms = require('ms');

//  Description: warn a mentioned user.
//  Usage: warn <user> <reason>
exports.run = async (client, message, args, level) => {
    console.log("RUN")
    // Get mentioned user, if none, return error
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return message.channel.send(`:x: Unable to warn user **undefined** due to an error.\n \`You must mention a user to warn\``);

    // Check if author has proper permissions
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`:x: Unable to warn user **${user.user.username}** due to an error.\n \`You do not have the required permission: 'ADMINISTRATOR'\``);

    // Get reason. If none set, set default reason
    let reason = args.join(' ').slice(22);
    if (reason === '') reason = 'No reason given'

    try {
        const res = await axios.post('http://localhost:8000/guilds/set-warn', {'discord_id': message.guild.id, 'name': message.guild.name, warnUser: user.user.id, warning: reason });

    // Configure embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username}'s ModLog`, `${client.user.avatarURL}`)
        .setDescription(`User **${user.user.username}#${user.user.discriminator}** was warned by **${message.author.username}#${message.author.discriminator}** for:\n\n **${reason}**\n\nWarnings: ${res.data.warnings}`)
        .setColor('#FF4D9C')
        .setTimestamp();

    // Get guild profile
    const guildRes = await axios.post('http://localhost:8000/guilds/profile', 
    {'discord_id': message.guild.id, 'name': message.guild.name });
    const guild = guildRes.data.guild;

    // Set channel & check of modlog channel is available. If so, send embed
    // to the modlog channel, otherwise, send to default message channel
    if (guild.modLogChannel !== null) {
        const channel = message.guild.channels.find(c => c.id === guild.modLogChannel);
        channel.send(embed);
    }

    message.channel.send(embed).then(msg => msg.delete(5000));

    if (res.data.warnings === guild.warningsMute) {
        let muterole = message.guild.roles.find(`name`, 'muted')

        //check mute role and create
        if(!muterole) return message.channel.send('No mute role, warn has been given but not muted. Please set muted role named "muted"');

        let mutetime = '120000000s';

        await(user.addRole(muterole.id));

        message.channel.send(`${user.user.username} has been temporarily muted`).then(msg => {msg.delete(5000)});

        setTimeout(function() {
            // check if user already has role todo
            user.removeRole(muterole.id);
            message.channel.send(`${user.user.username} has been unmuted`).then(msg => {msg.delete(5000)});
        }, ms(mutetime))
    }

    if(res.data.warnings == guild.warningsBan) {
        message.guild.member(user).ban(reason);
        message.channel.send(`${user.user.username} has been banned for being warned too many times`)
    }
    } catch (error) {
        message.channel.send(`Unable to warn user due to an error. If encountered, please send to developers.\n\`${error}\``);
    }

    
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "warn",
    category: "System",
    description: "warns a mentioned user",
    usage: "warn <user> <reason>"
};