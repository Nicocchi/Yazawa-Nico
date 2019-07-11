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

        // Slightly smaller text placed above the member's display name
        ctx.font = 'bold 60px sans-serif';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.strokeText('Welcome', 260, 100);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Welcome ', 260, 100);

        // Add an exclamation point here and below
        // ctx.font = applyText(canvas, `${member.displayName}!`, 60, 'bold');
        let dpN = member.displayName;
        if (dpN.length > 9) {
          dpN = member.displayName.slice(0, 9);
        }
        ctx.font = "bold 60px sans-serif"
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.strokeText(`${dpN}`, 570, 100);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${dpN}`, 570, 100);

        ctx.font = "bold 60px sans-serif"
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.strokeText(`to`, 260, 170);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`to`, 260, 170);

        let dpNG = member.guild.name;
        // if (dpNG.length > 20) {
        //   dpNG = member.displayName.slice(0, 20);
        // }

        ctx.font = applyText(canvas, `${member.guild.name}!`, 60, 'bold');
        // ctx.font = "bold 60px sans-serif"
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.strokeText(`${dpNG}`, 330, 170);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${dpNG}`, 330, 170);

        ctx.font = applyText(canvas, `You are the xxxth member!`, 60, 'bold');
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.strokeText(`You are the ${member.guild.members.array().length}th member!`, 260, 250);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`You are the ${member.guild.members.array().length}th member!`, 260, 250);

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
