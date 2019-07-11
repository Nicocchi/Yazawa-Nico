const Discord = require("discord.js");
const axios = require('axios');
const moment = require('moment');

//  Description: Display an AFK message when someone pings you if you are away
//  Usage: prefix arg1
exports.run = async (client, message, args, level) => {
    try {

        const res = await axios.post('http://localhost:8000/users/set-oldpf', {'discord_id': message.author.id, 'name': message.author.username});
        const data = res.data;

        message.channel.send(data.message);

        // async function asyncForEach(array, callback) {
        //     for (let index = 0; index < array.length; index++) {
        //       await callback(array[index], index, array);
        //     }
        // }

        // let users = [];

        // client.settings.forEach( async (element, i) => {
        //     if (element.id !== undefined) {
        //         console.log("ADDING USER => ",element.id);
        //         const userData = {
        //             'discord_id': element.id,
        //             'name': element.username,
        //             'loveGems': element.points,
        //             'experience': element.xp,
        //             'level': element.level,
        //             'marriages': element.marriages,
        //             'marriageSlots': element.marriageSlots,
        //         };
        //         await users.push(userData);
        //     }
            
        // })

        // console.log("USERS", users[0]);
        // console.log("USERS COUNT", users.length);
        // const myJson = JSON.stringify(users);

        // var fs = require('fs');
        // var fileContent = myJson;

        // fs.writeFile("./datas.json", fileContent, (err) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     };
        //     console.log("File has been created");
        //     message.channel.send("File has been created");
        // })

    } catch (error) {
        console.log(error.response);
        message.channel.send(error.response);
    }

    // message.channel.send("Finished");
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "oldpf",
  category: "Miscellaneous",
  description: "Runs command to set database",
  usage: "oldpf"
};
