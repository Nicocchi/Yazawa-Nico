const Discord = require('discord.js');

//  Description: Display the user\' avatar.
//  Usage: prefix arg1 arg2
exports.run = async (client, message, args) => {

    client.settings.set(message.author.id, 1, 'level');
    client.settings.set(message.author.id, args[0], 'xp');


    message.channel.send(`${message.author.tag} has set current xp to ${args[0]}`);
};

exports.conf = {
    enabled: 'true',
    guildOnly: 'false',
    aliases: [],
    permLevel: 'Bot Owner'
};

exports.help = {
    name: 'setxp',
    category: 'Administration',
    description: 'Add\'s experience',
    usage: 'addxp [amount]'
};