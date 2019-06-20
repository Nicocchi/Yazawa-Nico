const Discord = require("discord.js");
const axios = require('axios');
const Canvas = require('canvas');
const { Image } = require('canvas');

//  Description: Display User Profile Stats
//  Usage: prefix arg1 arg2

// Pass the entire Canvas object because you'll need to access its width, as well its context
const applyText = async (canvas, text, fntSize, weight = "normal") => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = fntSize;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${weight} ${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

exports.run = async (client, message, args, level) => {
  // TODO: SET AUTHORIZATION
  const res = await axios.post('http://localhost:8000/users/profile', {'discord_id': message.author.id, 'name': message.author.username});
  // console.log('res =>', res.data.user);
  // const bf = Buffer.from(profile.profileImage, 'binary').toString('base64');
  const profile = res.data.user;

  const canvas = Canvas.createCanvas(700, 700);
  const ctx = canvas.getContext('2d');

  // Draw the background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dropshadow
  ctx.shadowColor = '#898';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = -20;
  ctx.shadowOffsetY = 20;

  const bgImage = await Canvas.loadImage(__dirname + '/wallpaper.png');
  ctx.drawImage(bgImage, 10, 10, canvas.width - 20, canvas.height - 20);

  // Reset the blur effect
  ctx.shadowBlur = 0;
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Header
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(10, 200, 680, 150);

  // Left column
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(10, 350, 200, 340);

  // Right column
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillRect(210, 350, 500, 340);

  // Draw avatar
  const avatar = await Canvas.loadImage(message.author.displayAvatarURL);
  ctx.drawImage(avatar, 20, 180, 180, 180 );

  // Draw user's username
  ctx.font = await applyText(canvas, message.author.username, 80);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(message.author.username, 260, 270);

  // Draw user's level
  ctx.font = await applyText(canvas, "Level", 50);
  ctx.fillStyle = '#ffffff';
  ctx.fillText("LEVEL", 440, 340);

  ctx.font = await applyText(canvas, "999", 50, "bold");
  ctx.fillStyle = '#ffffff';
  ctx.fillText(profile.level, 580, 340);

  // Draw the XP Gauge
  // Background
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(250, 370, 400, 50);

  // Calculate value for front bar
  const xp = profile.experience;
  const maxXP = 85800;
  const perc = (xp / maxXP) * 100;
  console.log(perc);
  const value = Math.floor(perc * 400) / 100
  console.log(value);

  // Front bar
  ctx.fillStyle = "rgba(0, 118, 210, 0.7)";
  ctx.fillRect(250, 370, value, 50);

  // XP Text
  ctx.font = await applyText(canvas, `XP 99999 / 99999`, 40);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = "end";
  ctx.fillText(`XP ${xp} / ${maxXP}`, 600, 405);

  // Draw Cards Text
  ctx.font = await applyText(canvas, `Cards`, 50);
  ctx.fillStyle = '#000000';
  ctx.textAlign = "start";
  ctx.fillText(`Cards`, 230, 480);

  ctx.font = await applyText(canvas, `999999`, 50);
  ctx.fillStyle = '#000000';
  ctx.textAlign = "end";
  ctx.fillText(profile.cards.length, 675, 480);

  // Draw Love Gems Text
  ctx.font = await applyText(canvas, `Love Gems`, 50);
  ctx.fillStyle = '#000000';
  ctx.textAlign = "start";
  ctx.fillText(`Love Gems`, 230, 540);

  ctx.font = await applyText(canvas, `999999`, 50);
  ctx.fillStyle = '#000000';
  ctx.textAlign = "end";
  ctx.fillText(profile.loveGems, 675, 540);

  function fragmentText(text, maxWidth) {
    var words = text.split(' '),
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
  const text = `I am the number one idol in the universe! This is getting a bit too long isn't it? Isn't it?`;
  const txt = text.slice(0, 85)
  // ctx.font = await applyText(canvas, text, 50);
  ctx.font = "30px sans-serif"
  ctx.fillStyle = '#000000';
  ctx.textAlign = "start";

  const lines = fragmentText(txt, 430);
  console.log(lines);

  lines.forEach(function(line, i) {
    ctx.fillText(line, 230, (i + 1) * 30 + 560);
  })
  

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'user_profile.png');

  message.channel.send(attachment);
    
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "profile",
  category: "Miscellaneous",
  description: "Display User Profile Stats",
  usage: "profile"
};