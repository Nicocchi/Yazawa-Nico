const { MessageAttachment } = require("discord.js");
const axios = require("axios");
const Canvas = require("canvas");
const { Image, loadImage } = require("canvas");

//  Description: Display User Profile Stats
//  Usage: prefix arg1 arg2

// Pass the entire Canvas object because you'll need to access its width, as well its context
const applyText = async (canvas, text, fntSize, weight = "normal") => {
    const ctx = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = fntSize;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${weight} ${(fontSize -= 10)}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};

exports.run = async (client, message, args, level) => {
    let member = message.guild.member(message.mentions.users.first());
    if (!member) {
        member = {
            id: message.author.id,
            username: message.author.username,
            avatar: message.author.displayAvatarURL({format: 'jpg'}),
        };
    } else {
        member = {
            id: member.id,
            username: member.user.username,
            avatar: member.user.displayAvatarURL(),
        };
    }

    // console.log("Member", member.username);
    // TODO: SET AUTHORIZATION
    const res = await axios.post(`${process.env.BE_URL}/users/profile`, {
        discord_id: member.id,
        name: member.username,
    });
    // console.log('res =>', res.data.user);
    // const bf = Buffer.from(profile.profileImage, 'binary').toString('base64');
    const profile = res.data.user;
    // console.log("PROFILE", res);

    const canvas = Canvas.createCanvas(900, 730);
    const ctx = canvas.getContext("2d");

    // Draw the background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dropshadow
    ctx.shadowColor = "#898";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = -20;
    ctx.shadowOffsetY = 20;

    // const bgImage = await Canvas.loadImage(__dirname + '/Wallpaper.jpg');
    const bgImage = await Canvas.loadImage(profile.profileImage);
    ctx.drawImage(bgImage, 10, 10, canvas.width - 20, canvas.height - 20);

    // Reset the blur effect
    ctx.shadowBlur = 0;
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Header
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(10, 200, 880, 150);

    // Left column
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(10, 350, 270, 370);

    // Right column
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillRect(280, 350, 610, 370);
    console.log("DRAWING AVATAR");

    // Draw avatar
    const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({format: 'jpg'}));
    ctx.drawImage(avatar, 30, 130, 220, 220);

    // Draw user's username
    ctx.font = await applyText(canvas, member.username, 80);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(member.username, 360, 270);

    // Draw user's level
    ctx.font = await applyText(canvas, "Level", 50);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("LEVEL", 670, 340);

    ctx.font = await applyText(canvas, "999", 50, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.fillText(profile.level, 800, 340);

    // Draw the XP Gauge
    // Background
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(350, 370, 480, 50);

    // Calculate value for front bar
    const xp = profile.experience;
    const curLvl = profile.level;
    const maxXP = curLvl * 600;
    const perc = (xp / maxXP) * 100;
    // console.log(perc);
    const value = Math.floor(perc * 480) / 100;
    // console.log(value);

    // Front bar
    ctx.fillStyle = "rgba(0, 118, 210, 0.7)";
    ctx.fillRect(350, 370, value, 50);

    // XP Text
    ctx.font = await applyText(canvas, `XP 99999 / 99999`, 40);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "end";
    ctx.fillText(`XP ${xp} / ${maxXP}`, 650, 405);

    // Draw Cards Text
    ctx.font = await applyText(canvas, `Cards`, 50);
    ctx.fillStyle = "#000000";
    ctx.textAlign = "start";
    ctx.fillText(`Cards`, 330, 480);

    ctx.font = await applyText(canvas, `999999`, 50);
    ctx.fillStyle = "#000000";
    ctx.textAlign = "end";
    ctx.fillText(profile.cards.length, 875, 480);

    // Draw Love Gems Text
    ctx.font = await applyText(canvas, `Love Gems`, 50);
    ctx.fillStyle = "#000000";
    ctx.textAlign = "start";
    ctx.fillText(`Love Gems`, 330, 540);

    ctx.font = await applyText(canvas, `999999`, 50);
    ctx.fillStyle = "#000000";
    ctx.textAlign = "end";
    ctx.fillText(profile.loveGems, 875, 540);

    function fragmentText(text, maxWidth) {
        var words = text.split(" "),
            lines = [],
            line = "";
        if (ctx.measureText(text).width < maxWidth) {
            return [text];
        }
        while (words.length > 0) {
            while (ctx.measureText(words[0]).width >= maxWidth) {
                var tmp = words[0];
                words[0] = tmp.slice(0, -1);
                if (words.length > 1) {
                    words[1] = tmp.slice(-1) + words[1];
                } else {
                    words.push(tmp.slice(-1));
                }
            }
            if (ctx.measureText(line + words[0]).width < maxWidth) {
                line += words.shift() + " ";
            } else {
                lines.push(line);
                line = "";
            }
            if (words.length === 0) {
                lines.push(line);
            }
        }
        return lines;
    }

    // Draw Info Text
    ctx.font = "35px sans-serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "start";
    ctx.fillText(`Info Box`, 330, 590);

    const text = profile.profileMessage;
    const txt = text.slice(0, 116);
    // ctx.font = await applyText(canvas, text, 50);
    ctx.font = "30px sans-serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "start";

    const lines = fragmentText(txt, 530);
    // console.log(lines);

    lines.forEach(function(line, i) {
        ctx.fillText(line, 330, (i + 1) * 30 + 600);
    });

    // Draw Marriages
    ctx.font = "40px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "start";
    ctx.fillText(`Marriages`, 50, 400);

    const txt1 = profile.marriages;

    if (profile.marriages.length > 0) {
        let marriages = [];

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        const start = async () => {
            await asyncForEach(txt1, async (mg) => {
                // console.log("MG", mg);
                const res1 = await axios.post(`${process.env.BE_URL}/users/profile`, {
                    discord_id: mg
                });
                const prof = await res1.data.user;
                // console.log(prof);
                await marriages.push(prof.name);
            });
        };

        await start();

        console.log("Marriages", marriages)

        ctx.font = "40px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "start";
        ctx.fillText(`Marriages`, 50, 400);

        ctx.font = "30px sans-serif";
        const start2 = async () => {
            await asyncForEach(marriages, async (mg, i) => {
                ctx.font = await applyText(canvas, mg, 40);
                if (mg.length >= 14) mg = mg.slice(0, 14);
                ctx.fillText(mg, 30, (i + 1) * 30 + 410);
            });
        };

        await start2();
    } else {
        ctx.font = await applyText(canvas, "No Marriages", 40);
        ctx.fillText("No Marriages", 50, 450);
    }

    const attachment = new MessageAttachment(canvas.toBuffer());

    message.channel.send(attachment);
};

exports.conf = {
    enabled: "true",
    guildOnly: "false",
    aliases: [],
    permLevel: "User",
};

exports.help = {
    name: "profile",
    category: "Miscellaneous",
    description: "Display User Profile Stats",
    usage: "profile",
};
