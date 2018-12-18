//  Description: warn a mentioned user.
//  Usage: warn <user> <reason>
const Discord = require("discord.js");
const fs = require('fs');
const ms = require('ms');
// let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

exports.run = async (client, message, args, level) => {
    const defaults = client.config.defaultSettings;
    if (!client.settings.has(message.guild.id))
        client.settings.set(message.guild.id, defaults);
    const settings = client.settings.get(message.guild.id);

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Can\'t warn user because you don\'t have permission');

    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!user) return message.reply('Could not find user');

    if(user.hasPermission('ADMINISTRATOR')) return message.channel.send('Can\'t warn user because you don\'t have permission');
    let reason = args.join(' ').slice(22);
    if(!reason) return message.reply('Need to specify a reason');


    let warnings = settings.warnings;

    if(Object.keys(warnings).length === 0 && warnings.constructor === Object) {
        const defWarn = {
            [user.id] : {"warns": 0}
        }
        client.settings.set(message.guild.id, defWarn, 'warnings');
    }

    let warns = settings.warnings;

    if(!warns[user.id]) {
        const defWarn = {
            ...warnings,
            [user.id] : {"warns": 1}
        }
        client.settings.set(message.guild.id, defWarn, 'warnings');
    } else {
        let numb = warns[user.id].warns;
        const defWarn = {
            ...warnings,
            [user.id] : {"warns" : ++numb}
        }
        client.settings.set(message.guild.id, defWarn, 'warnings');
    }

    let newWarns = settings.warnings;
    let numberW = newWarns[user.id].warns += 1;

    let embed = new Discord.RichEmbed()
        .setDescription("Warns")
        .setAuthor(`${client.user.username}'s ModLog`, `${client.user.avatarURL}`)
        .setColor("#FF4D9C")
        .setTimestamp()
        .addField("Warned User", `${user.user.username} with ID ${user.id}`)
        .addField('Warned By', `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Warned In", message.channel)
        .addField("Number of Warnings", numberW)
        .addField('Time', message.createdAt)
        .addField("Reason", reason);

    if(user) user.send(embed);

    const warnchannel = message.guild.channels.find(c => c.id === settings.modLogChannel)
    if(!warnchannel) return message.reply(embed);
    warnchannel.send(embed);

    if(numberW == settings.warningsMute) {
        let muterole = message.guild.roles.find(`name`, 'muted')
        //check mute role and create
        if(!muterole) return message.channel.send('No mute role, warn has been given but not muted. Please set muted role named "muted"');

        let mutetime = '10s';
        await(user.addRole(muterole.id));
        message.channel.send(`${user.user.username} has been temporarily muted`).then(msg => {msg.delete(5000)});

        setTimeout(function() {
            // check if user already has role todo
            user.removeRole(muterole.id);
            message.channel.send(`${user.user.username} has been unmuted`).then(msg => {msg.delete(5000)});
        }, ms(mutetime))
    }
    if(numberW == settings.warningsBan) {

        const defWarn = {
            ...warnings,
            [user.id] : {"warns" : 0}
        }

        client.settings.set(message.guild.id, defWarn, 'warnings');
        message.guild.member(user).ban(reason);
        message.reply(`${user.username} has been banned`)
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: '[]',
    permLevel: "User"
};

exports.help = {
    name: "warn",
    category: "System",
    description: "warns a mentioned user",
    usage: "warn <user> <reason>"
};