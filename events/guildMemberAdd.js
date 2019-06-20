// This event executes when a new member joins a server.
const Discord = require("discord.js");
const axios = require('axios');
const Canvas = require('canvas');
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
  console.log(member.guild);
  try {
    const channel = member.guild.channels.find(ch => ch.name === 'room');

    const canvas = Canvas.createCanvas(700, 250);
      const ctx = canvas.getContext('2d');

      const background = await Canvas.loadImage(path.resolve(__dirname, `../wallpaper.jpg`));
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#74037b';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Slightly smaller text placed above the member's display name
      ctx.font = '48px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('Welcome ', canvas.width / 2, canvas.height / 2.3);

      // Add an exclamation point here and below
      ctx.font = applyText(canvas, `${member.displayName}!`);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${member.displayName}`, canvas.width / 2, canvas.height / 1.3);

      ctx.beginPath();
      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
      ctx.drawImage(avatar, 25, 25, 200, 200);

      const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

      channel.send(`Welcome to the server, ${member}!`, attachment);
    
  } catch (e) {
    client.logger.error(e);
  }
  // try {
    // const defaults = client.config.defaultSettings;

    // if (!client.settings.has(member.guild.id))
    //   client.settings.set(member.guild.id, defaults);

    // const settings = client.settings.get(member.guild.id);

    // If welcome is off, don't proceed
    // if (settings.welcomeEnabled) {
      // const canvas = Canvas.createCanvas(700, 250);
      // const ctx = canvas.getContext('2d');

      // const background = await Canvas.loadImage('./wallpaper.jpg');
      // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      // ctx.strokeStyle = '#74037b';
      // ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // // Slightly smaller text placed above the member's display name
      // ctx.font = '28px sans-serif';
      // ctx.fillStyle = '#ffffff';
      // ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

      // // Add an exclamation point here and below
      // ctx.font = applyText(canvas, `${member.user.displayName}!`);
      // ctx.fillStyle = '#ffffff';
      // ctx.fillText(`${member.user.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

      // ctx.beginPath();
      // ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      // ctx.closePath();
      // ctx.clip();

      // const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
      // ctx.drawImage(avatar, 25, 25, 200, 200);

      // const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

      // member.channel.send(`Welcome to the server, ${member}!`, attachment);








      // Replace the placeholders in the welcome message with actual data
      // const welcomeMessage = settings.welcomeMessage
      //   .replace("<user>", `<@${member.user.id}>`)
      //   .replace("<guild>", `${member.guild.name}`);

      // // Send the welcome message to the welcome channel
      // const greetChannel = member.guild.channels.find(
      //   c => c.id === settings.welcomeChannel
      // );
      // if (greetChannel) {
      //   greetChannel.send(welcomeMessage).catch(console.error);
      // }
    // }

    // ModLog
    // if (!settings.modlog) return;
    // const modLogChannel = member.guild.channels.find(
    //   c => c.id === settings.modLogChannel
    // );
    // if (!modLogChannel) return;

    // try {
    //   let embed = new Discord.RichEmbed()
    //     .setAuthor(`Member Joined`)
    //     .setDescription(`${member.user.username}`)
    //     .setThumbnail(member.user.avatarURL)
    //     .setTimestamp()
    //     .setFooter(`ID: ${member.user.id}`)
    //     .setColor("#FF4D9C");

    //   // Send the joined message to the modlog channel
    //   modLogChannel.send(embed).catch(console.error);
    // } catch (e) {
    //   client.logger.error(e);
    // }
  // } catch (e) {
  //   client.logger.error(e);
  // }
};
