// This event executes when a new member joins a server.
const Discord = require("discord.js");
const axios = require('axios');
const Canvas = require('canvas');
const moment = require('moment');
var path = require('path');

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

module.exports = async (client, member) => {
  // Load the guild's settings
  // console.log(member.guild);
  try {
      const guildRes = await axios.post('http://localhost:8000/guilds/profile', 
      {'discord_id': member.guild.id, 'name': member.guild.name });
      const guild = guildRes.data.guild;

      const channel = member.guild.channels.find(ch => ch.id === guild.welcomeChannel);

      if (guild.welcomeEnabled && guild.welcomeChannel !== null) {
        const canvas = Canvas.createCanvas(1000, 300);
        const ctx = canvas.getContext('2d');

        // const background = await Canvas.loadImage(path.resolve(__dirname, `../wallpaper.jpg`));
        const bgImage = await Canvas.loadImage(guild.greetingImage);
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

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

        let text = "";
        if (!guild.welcomeImgMessage || guild.welcomeImgMessage === "" || guild.welcomeImgMessage === null || guild.welcomeImgMessage === undefined) {
          text = `Welcome <user> to <guild>! You are the <count>th user!`;
        } else {
          text = guild.welcomeImgMessage;
        }

        const txt = text.replace("<user>", member.displayName).replace("<guild>", member.guild.name).replace("<count>", member.guild.memberCount);
      
        ctx.font = 'bold 60px sans-serif';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillStyle = '#ffffff';
      
        const lines = fragmentText(txt, 730);
        // console.log(lines);
      
        lines.forEach(function(line, i) {
          ctx.fillText(line, 260, (i + 1) * 60 + 30);
          ctx.strokeText(line, 260, (i + 1) * 60 + 30);
        })

        ctx.beginPath();
        // ctx.arc(125, 155, 100, 0, Math.PI * 2, true);
        ctx.arc(125, 145, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
        // ctx.drawImage(avatar, 25, 25, 205, 205);
        ctx.drawImage(avatar, 25, 45, 200, 200);

        const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
        const msg = guild.welcomeMessage.replace("<user>", member).replace("<guild>", member.guild.name);

        channel.send(msg, attachment);

        // Modlog
        try {
          const modLogChannel = channel.guild.channels.find(ch => ch.id === guild.modLogChannel);
      
          if (guild.modlog && modLogChannel !== null) {
            try {
              let embed = new Discord.RichEmbed()
                .setDescription(`**Member Joined:** ${member.user.username}#${member.user.discriminator}`)
                .setThumbnail(member.user.displayAvatarURL)
                .setTimestamp()
                .setColor("#FF4D9C");
              
              // Send the deleted message to the modlog channel
              modLogChannel.send(embed).catch(console.error);
            } catch (e) {
              client.logger.error(`[guildMemberAdd.js]: Embed: ${e}`);
              client.channel.send(`Unable to show welcome log due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] [guildMemberAdd.js]: Embed: | ${e.response}\``);
            }
          }
      
        } catch (e) {
          client.logger.error(`[guildMemberAdd.js]: Modlog: ${e}`);
          client.channel.send(`Unable to show welcome log due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] [guildMemberAdd.js]: Modlog: | ${e.response}\``);
        }
      }
    
  } catch (e) {
    client.logger.error(`[guildMemberAdd.js]: ${e}`);
  }
};
