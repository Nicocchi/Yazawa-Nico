const Discord = require('discord.js');
//  Description: Display the angry image.
//  Usage: angry arg1
exports.run = async (client, message, args, level) => {
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    client.parseJSON("./JSON/angry.json").then(res => {

        if(!user) {
            let embed = new Discord.RichEmbed()
                .addField(`((╬◣﹏◢))`, `${message.author} is angry!`)
                .setColor('#FF4D9C')
                .setImage(res);

            return message.channel.send({embed: embed});
        };

        let embed = new Discord.RichEmbed()
            .addField(`((╬◣﹏◢))`, `${message.author} is angry at ${user.user}!`)
            .setColor('#FF4D9C')
            .setImage(res);

        message.channel.send({embed: embed});
    }).catch(err => client.logger.log(err, 'Error'));
};

exports.conf = {
    enabled: 'true',
    guildOnly: 'false',
    aliases: '[]',
    permLevel: 'User'
};

exports.help = {
    name: 'angry',
    category: 'Miscelaneous',
    description: 'Display the user\' avatar.',
    usage: 'angry <user>'
};


