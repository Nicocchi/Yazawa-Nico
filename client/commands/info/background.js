const axios = require('axios');
const moment = require('moment');

//  Description: Display User Profile Stats
//  Usage: prefix arg1 arg2
exports.run = async (client, message, args, level) => {
    if (message.attachments.size > 0) {
        const attachments = message.attachments;
        try {
            let res = null;
            if (args[0] === 'greeting' && message.member.hasPermission("ADMINISTRATOR")) {
                res = await axios.post(`${process.env.BE_URL}/guilds/set-greeting-image`, {'discord_id': message.guild.id, 'name': message.guild.name, 'imageUrl': attachments.array()[0].url});
            } else {
                res = await axios.post(`${process.env.BE_URL}/users/setprofileimage`, {'discord_id': message.author.id, 'name': message.author.username, 'imageUrl': attachments.array()[0].url});
            }

            const profile = res.data;

            message.channel.send(profile.message);

        } catch (error) {
            message.channel.send(`Unable to set background due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Background | ${error.response}\``);

        }

        return;
    }

    message.channel.send("Must supply an image.");
    
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "background",
  category: "Miscellaneous",
  description: "Display User Profile Stats",
  usage: "profile"
};