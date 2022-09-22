const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hug")
    .setDescription(
      "(つ≧▽≦)つ"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to hug")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/hug.json");
    const target = interaction.options.getUser("user");
    let msg = `You are hugging yourself`;
    if (target) {
        if (target.id === client.id) {
            msg = "Awwe~ Nico likes you too~"
        } else {
            msg = `Awwe, ${interaction.user.username} is hugging ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(つ≧▽≦)つ`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
