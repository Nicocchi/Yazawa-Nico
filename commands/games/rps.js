const Discord = require("discord.js");

//  Description: Play a game of RPS
//  Usage: rps
exports.run = async (client, message, args, level) => {
  const defaults = client.config.defaultUserSettings;
  if (!client.settings.has(message.author.id))
    client.settings.set(message.author.id, defaults);
  let settings = client.getUserSettings(message.author.id);

  let amount = args[0];
  let gems = settings.points;

  let embed = new Discord.RichEmbed()
    .addField(
      "Let's play a game",
      "Choose between **rock**, **paper**, or **scissors**.\n\n((≡|≡))_／ ＼_((≡|≡) )\n\n Timer closes in 10 seconds"
    )
    .setColor("#FF4D9C");

  // Reponses to check for verification
  const responses = ["rock", "paper", "scissors"];

  // Get the repsonse from the user
  let response = await client.awaitReply(message, { embed: embed }, 10000);

  // Keep asking until the user gets a valid choice
  while (responses.includes(response.toLowerCase()) === false) {
    // If correct, break the while loop
    if (responses.includes(response.toLowerCase())) {
      break;
    }

    response = await client.awaitReply(
      message,
      "Not a valid choice. Please choose again.",
      10000
    );
  }

  const ranNum = client.randomNumber(1, 4);

  switch (ranNum) {
    case 1:
      // CPU chose rock
      if (response.toLowerCase() === "rock") {
        message.channel.send(
          "You chose rock. I chose rock.\nHey! We came to a draw!\n\n**╮( ˘ ､ ˘ )╭**"
        );

        if (amount) {
          const amt = amount / 2;
          const win = gems + amt;
          client.settings.set(message.author.id, win, "points");
          message.reply(`You gained ${amt} love gems!`);
        }

        client.settings.set(message.author.id, false, "isRPS");
        client.settings.set(message.author.id, false, "isRPSGamble");
        client.settings.set(message.author.id, 0, "gambleAmount");
      } else if (response.toLowerCase() === "paper") {
        message.channel.send(
          "You chose paper. I chose rock.\nAww, you won!\n\n**｡ﾟ･ (>﹏<) ･ﾟ｡**"
        );

        if (amount) {
          const amt = amount * 2;
          const win = gems + amt;
          client.settings.set(message.author.id, win, "points");
          message.reply(`You gained ${amt} love gems!`);
        }

        client.settings.set(message.author.id, false, "isRPS");
        client.settings.set(message.author.id, false, "isRPSGamble");
        client.settings.set(message.author.id, 0, "gambleAmount");
      } else if (response.toLowerCase() === "scissors") {
        message.channel.send(
          "You chose scissors. I chose rock.\nYay! I won!\n\n**(๑˃ᴗ˂)ﻭ**"
        );

        if (amount) {
          const amt = amount;
          const lose = gems - amt;
          client.settings.set(message.author.id, lose, "points");
          message.reply(`You lost ${amt} love gems!`);
        }

        client.settings.set(message.author.id, false, "isRPS");
        client.settings.set(message.author.id, false, "isRPSGamble");
        client.settings.set(message.author.id, 0, "gambleAmount");
      }
      break;

    case 2:
      // CPU chose paper
      if (response.toLowerCase() === "paper") {
        message.channel.send(
          "You chose paper. I chose paper.\nHey! We came to a draw!\n\n**╮( ˘ ､ ˘ )╭**"
        );

        if (amount) {
          const amt = amount / 2;
          const win = gems + amt;
          client.settings.set(message.author.id, win, "points");
          message.reply(`You gained ${amt} love gems!`);
        }

        client.settings.set(message.author.id, false, "isRPS");
        client.settings.set(message.author.id, false, "isRPSGamble");
        client.settings.set(message.author.id, 0, "gambleAmount");
      } else if (response.toLowerCase() === "rock") {
        message.channel.send(
          "You chose rock. I chose paper.\nYay! I won!\n\n**(๑˃ᴗ˂)ﻭ**"
        );

        if (amount) {
          const amt = amount * 2;
          const win = gems + amt;
          client.settings.set(message.author.id, win, "points");
          message.reply(`You gained ${amt} love gems!`);
        }

        client.settings.set(message.author.id, false, "isRPS");
        client.settings.set(message.author.id, false, "isRPSGamble");
        client.settings.set(message.author.id, 0, "gambleAmount");
      } else if (response.toLowerCase() === "scissors") {
        message.channel.send(
          "You chose scissors. I chose paper.\nAww, you won!\n\n**｡ﾟ･ (>﹏<) ･ﾟ｡**"
        );

        if (amount) {
          const amt = amount;
          const lose = gems - amt;
          client.settings.set(message.author.id, lose, "points");
          message.reply(`You lost ${amt} love gems!`);
        }

        client.settings.set(message.author.id, false, "isRPS");
        client.settings.set(message.author.id, false, "isRPSGamble");
        client.settings.set(message.author.id, 0, "gambleAmount");
      }
      break;

    case 3:
      // CPU chose scissors
      if (response.toLowerCase() === "scissors") {
        message.channel.send(
          "You chose scissors. I chose scissors.\nHey! We came to a draw!\n\n**╮( ˘ ､ ˘ )╭**"
        );

        if (amount) {
          const amt = amount / 2;
          const win = gems + amt;
          client.settings.set(message.author.id, win, "points");
          message.reply(`You gained ${amt} love gems!`);
        }

        client.settings.set(message.author.id, false, "isRPS");
        client.settings.set(message.author.id, false, "isRPSGamble");
        client.settings.set(message.author.id, 0, "gambleAmount");
      } else if (response.toLowerCase() === "rock") {
        message.channel.send(
          "You chose rock. I chose scissors.\nAww, you won!\n\n**｡ﾟ･ (>﹏<) ･ﾟ｡**"
        );

        if (amount) {
          const amt = amount * 2;
          const win = gems + amt;
          client.settings.set(message.author.id, win, "points");
          message.reply(`You gained ${amt} love gems!`);
        }

        client.settings.set(message.author.id, false, "isRPS");
        client.settings.set(message.author.id, false, "isRPSGamble");
        client.settings.set(message.author.id, 0, "gambleAmount");
      } else if (response.toLowerCase() === "scissors") {
        message.channel.send(
          "You chose paper. I chose scissors.\nYay! I won!\n\n**(๑˃ᴗ˂)ﻭ**"
        );

        if (amount) {
          const amt = amount;
          const lose = gems - amt;
          client.settings.set(message.author.id, lose, "points");
          message.reply(`You lost ${amt} love gems!`);
        }

        client.settings.set(message.author.id, false, "isRPS");
        client.settings.set(message.author.id, false, "isRPSGamble");
        client.settings.set(message.author.id, 0, "gambleAmount");
      }
      break;

    default:
      break;
  }
};

exports.conf = {
  enabled: "false",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "rps",
  category: "Games",
  description: "Play a game of RPS",
  usage: "rps"
};
