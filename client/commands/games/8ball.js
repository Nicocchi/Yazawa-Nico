const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { randomNumber } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription(
      "⋋_⋌"
    )
    .addStringOption((option) =>
      option.setName("question").setDescription("Your question").setRequired(true)
    ),
  async execute(interaction) {
    let replies = [
        "Yes",
        "No",
        "I do not know",
        "Ask again later",
        "Ni-Nico Nii?",
        "Maybe",
        "Hmm, appears to be true...",
        "As I see it, yes",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don’t count on it",
        "It is certain",
        "It is decidedly so",
        "Most likely",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Outlook good",
        "Reply hazy, try again",
        "Signs point to yes",
        "Very doubtful",
        "Without a doubt",
        "Yes - definitely",
        "You may rely on it"
      ];

    let rnum = randomNumber(0, replies.length - 1);
    
    let msg = `> ${interaction.options.getString("question")}\n${replies[rnum]}`;

    return interaction.reply({
      content: msg,
    });
  },
};
