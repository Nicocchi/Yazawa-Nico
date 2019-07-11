const Discord = require("discord.js");
const axios = require('axios');
const moment = require('moment');

//  Description: Display User Profile Stats
//  Usage: prefix arg1 arg2
exports.run = async (client, message, args, level) => {
    let msg = args.join(" ");
    if (msg) {
        try {
            const res = await axios.post('http://localhost:8000/users/set-pfinfo', {'discord_id': message.author.id, 'name': message.author.username, 'pfinfo': msg});
            const profile = res.data;

            message.channel.send(profile.message);

        } catch (error) {
            message.channel.send(`Unable to set info box text due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Info Box Text | ${error.response.status} - ${error.response.statusText}\``);

        }

        return;
    }

    message.channel.send("Must supply a message. Max chars -> `116`");
    
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "pfinfo",
  category: "Miscellaneous",
  description: "Change User Profile Text",
  usage: "pfinfo"
};