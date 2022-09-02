const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Send loveca to a specific user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to send loveca to")
        .setRequired(true)
    )
    .addNumberOption((amount) =>
      amount
        .setName("amount")
        .setDescription("amount of loveca to send")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const target = interaction.options.getUser("user");
      const amount = interaction.options.getNumber("amount");
      const res = await axios.post(`${process.env.BE_URL}/users/send`, {
        discord_id: interaction.user.id,
        name: interaction.user.username,
        mentioned_id: target.id,
        mentioned_name: target.username,
        sendAmount: amount,
      });

      const user = res.data;
      await interaction.deferReply();
      await interaction.editReply({
        content: user.message,
      });
    } catch (error) {
      await interaction.deferReply();
      await interaction.editReply({
        content: "An unexpected error has occured...",
        ephemeral: true,
      });
    }
  },
};
