const Discord = require('discord.js');

//  Description: Display the user\' avatar.
//  Usage: prefix arg1 arg2
exports.run = async (client, message, args, level) => {
    let aMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if(!aMember) {
        let embed = new Discord.RichEmbed()
            .setTitle(`${message.author.username}'s Avatar`)
            .setColor('#FF4D9C')
            .setImage(message.author.displayAvatarURL);

        return message.channel.send({embed: embed});
    };

    let embed = new Discord.RichEmbed()
        .setTitle(`${aMember.user.username}'s Avatar`)
        .setColor('#FF4D9C')
        .setImage(aMember.user.displayAvatarURL);

    message.channel.send({embed: embed});
};

exports.conf = {
     enabled: 'true',
     guildOnly: 'false',
     aliases: '[]',
     permLevel: 'User'
};

exports.help = {
     name: 'avatar',
     category: 'Miscelaneous',
     description: 'Display the user\' avatar.',
     usage: 'avatar [user]'
};


