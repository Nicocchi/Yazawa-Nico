const axios = require("axios");
const { MessageEmbed } = require("discord.js");

//  Description: Get an idol by their name
//  Usage: prefix arg1
exports.run = async (client, message, args, level) => {
    let msg = args.join(" ");
    console.log(msg);
    if (!msg || msg === "undefined") {
        return message.channel.send("Must include name: ex: !idol Yazawa Nico");
    }

    const res = await axios.get(`http://schoolido.lu/api/idols/${msg}/`);
    if (res === undefined || res === null) {
        return message.channel.send("Incorrect name: ex !idol Yazawa Nico")
    }
    // console.log(res.data);

    let embed = new MessageEmbed()
        .setAuthor(res.data.name, res.data.chibi_small)
        .setThumbnail(res.data.chibi)
        .setColor("#FF4D9C")
        .addField(`EN Name`, `[${res.data.name}](${res.data.website_url})`, true)
        .addField("JP Name", `[${res.data.japanese_name}](${res.data.website_url})`, true)
        .addField("Seiyuu/CV", `[${res.data.cv.name}](${res.data.cv.url})`, true)
        .addField("School", res.data.school, true)
        .addField("Year", res.data.year, true)
        .addField("Age", res.data.age, true)
        .addField("Birthday", res.data.birthday, true)
        .addField("Astrological Sign", res.data.astrological_sign, true)
        .addField("Blood Type", res.data.blood, true)
        .addField("Height", res.data.height, true)
        .addField("Measurements", res.data.measurements, true)
        .addField("Favorite Food", res.data.favorite_food, true)
        .addField("Least Favorite Food", res.data.least_favorite_food, true)
        .addField("Hobbies", res.data.hobbies, true)
        .addField("Attribute", res.data.attribute, true)
        .addField("Main Unit", res.data.main_unit, true)
        .addField("Sub Unit", res.data.sub_unit, true)
        .addField("Summary", res.data.summary)
        .setFooter(`Powered by School Idol Tomodachi: https://schoolido.lu/`)
    message.channel.send(embed);
};

exports.conf = {
    enabled: "true",
    guildOnly: "false",
    aliases: [],
    permLevel: "User",
};

exports.help = {
    name: "idol",
    category: "Love Live",
    description: "Get Idol via name",
    usage: "idol <name>",
};
