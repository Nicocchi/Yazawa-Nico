const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("greet")
    .setDescription(
      "＼(⌒▽⌒)"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to greet")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/greet.json");
    const target = interaction.options.getUser("user");
    let msg = `You greeted the world!`;
    if (target) {
        if (target.id === client.id) {
            msg = "Nico Nii!~"
        } else {
            msg = `${interaction.user.username} is greeting ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `＼(⌒▽⌒)`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
