const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("evil")
    .setDescription(
      "(＃￣ω￣)"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to plot with")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/evil.json");
    const target = interaction.options.getUser("user");
    let msg = `You are being evil~~ Nishishishi`;
    if (target) {
        if (target.id === client.id) {
            msg = "(＃￣ω￣)"
        } else {
            msg = `${interaction.user.username} and ${target.username} are plotting something...`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(＃￣ω￣)`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
