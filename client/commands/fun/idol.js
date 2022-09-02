const {
  SlashCommandBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("idol")
    .setDescription("Learn about your favorite idol~"),
  async execute(interaction) {
    const unitRow = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("unit")
        .setPlaceholder("Select a unit")
        .addOptions(
          {
            label: "μ's",
            description: "μ's idols",
            value: "Muse",
          },
          {
            label: "Aqours",
            description: "Aqours idols",
            value: "Aqours",
          },
          {
            label: "Nijigasaki",
            description: "Nijigasaki idols",
            value: "Nijigasaki",
          },
          {
            label: "Leilla",
            description: "Leilla idols",
            value: "Leilla",
          },
          {
            label: "A-Rise",
            description: "A-Rise idols",
            value: "A-Rise",
          },
          {
            label: "Saint Snow",
            description: "Saint Snow idols",
            value: "Saint Snow",
          },
          {
            label: "Sunny Passion",
            description: "Sunny Passion idols",
            value: "Sunny Passion",
          },
          {
            label: "Other",
            description: "Other idols",
            value: "Other",
          }
        )
    );
    const museRow = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("museIdols")
        .setPlaceholder("Select an idol")
        .addOptions(
          {
            label: "Kousaka Honoka 高坂 穂乃果",
            description: "Kousaka Honoka",
            value: "Kousaka Honoka",
          },
          {
            label: "Ayase Eli 絢瀬 絵里",
            description: "Ayase Eli",
            value: "Ayase Eli",
          },
          {
            label: "Minami Kotori 南 ことり",
            description: "Minami Kotori",
            value: "Minami Kotori",
          },
          {
            label: "Sonoda Umi 南 園田 海未",
            description: "Sonoda Umi",
            value: "Sonoda Umi",
          },
          {
            label: "Hoshizora Rin 星空 凛",
            description: "Hoshizora Rin",
            value: "Hoshizora Rin",
          },
          {
            label: "Nihsikino Maki 西木野 真姫",
            description: "Nihsikino Maki",
            value: "Nihsikino Maki",
          },
          {
            label: "Tojo Nozomi 東條 希",
            description: "Tojo Nozomi",
            value: "Tojo Nozomi",
          },
          {
            label: "Koizumi Hanayo 小泉 花陽",
            description: "Koizumi Hanayo",
            value: "Koizumi Hanayo",
          },
          {
            label: "Yazawa Nico 矢澤 にこ",
            description: "Yazawa Nico",
            value: "Yazawa Nico",
          }
        )
    );

    const aqoursRow = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("aqoursIdols")
        .setPlaceholder("Select an idol")
        .addOptions(
          {
            label: "Takami Chika 高海 千歌",
            description: "Takami Chika",
            value: "Takami Chika",
          },
          {
            label: "Sakurauchi Riko 桜内 梨子",
            description: "Sakurauchi Riko",
            value: "Sakurauchi Riko",
          },
          {
            label: "Matsuura Kanan 松浦 果南",
            description: "Matsuura Kanan",
            value: "Matsuura Kanan",
          },
          {
            label: "Kurosawa Dia 黒澤 ダイヤ",
            description: "Kurosawa Dia",
            value: "Kurosawa Dia",
          },
          {
            label: "Watanabe You 渡辺 曜",
            description: "Watanabe You",
            value: "Watanabe You",
          },
          {
            label: "Tsushima Yoshiko 津島 善子",
            description: "Tsushima Yoshiko",
            value: "Tsushima Yoshiko",
          },
          {
            label: "Kunikida Hanamaru 国木田 花丸",
            description: "Kunikida Hanamaru",
            value: "Kunikida Hanamaru",
          },
          {
            label: "Ohara Mari 小原 鞠莉",
            description: "Ohara Mari",
            value: "Ohara Mari",
          },
          {
            label: "Kurosawa Ruby 黒澤 ルビィ",
            description: "Kurosawa Ruby",
            value: "Kurosawa Ruby",
          }
        )
    );

    const nijigasakiRow = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("nijigasakiIdols")
        .setPlaceholder("Select an idol")
        .addOptions(
          {
            label: "Uehara Ayumu 上原 步夢",
            description: "Uehara Ayumu",
            value: "Uehara Ayumu",
          },
          {
            label: "Nakasu Kasumi 中須 かすみ",
            description: "Nakasu Kasumi",
            value: "Nakasu Kasumi",
          },
          {
            label: "Osaka Shizuku 桜坂 しずく",
            description: "Osaka Shizuku",
            value: "Osaka Shizuku",
          },
          {
            label: "Asaka Karin 朝香 果林",
            description: "Asaka Karin",
            value: "Asaka Karin",
          },
          {
            label: "Miyashita Ai 宮下 愛",
            description: "Miyashita Ai",
            value: "Miyashita Ai",
          },
          {
            label: "Konoe Kanata 近江 彼方",
            description: "Konoe Kanata",
            value: "Konoe Kanata",
          },
          {
            label: "Yuki Setsuna 優木 せつ菜",
            description: "Yuki Setsuna",
            value: "Yuki Setsuna",
          },
          {
            label: "Emma Verde エマ・ヴェルデ",
            description: "Emma Verde",
            value: "Emma Verde",
          },
          {
            label: "Tennoji Rina 天王寺 璃奈",
            description: "Tennoji Rina",
            value: "Tennoji Rina",
          },
          {
            label: "Mifune Shioriko 三船 栞子",
            description: "Mifune Shioriko",
            value: "Mifune Shioriko",
          },
          {
            label: "Mia Taylor ミア・テイラー",
            description: "Mia Taylor",
            value: "Mia Taylor",
          },
          {
            label: "Lanzhu Zhong ショウ・ランジュ",
            description: "Lanzhu Zhong",
            value: "Lanzhu Zhong",
          }
        )
    );

    const leillaRow = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("leillaIdols")
        .setPlaceholder("Select an idol")
        .addOptions(
          {
            label: "Shibuya Kanon 澁谷 かのん",
            description: "Shibuya Kanon",
            value: "Shibuya Kanon",
          },
          {
            label: "Tang Keke 唐 可可",
            description: "Tang Keke",
            value: "Tang Keke",
          },
          {
            label: "Arashi Chisato 嵐 千砂都",
            description: "Arashi Chisato",
            value: "Arashi Chisato",
          },
          {
            label: "Heanna Sumire 平安名 すみれ",
            description: "Heanna Sumire",
            value: "Heanna Sumire",
          },
          {
            label: "Hazuki Ren 葉月 恋",
            description: "Hazuki Ren",
            value: "Hazuki Ren",
          },
          {
            label: "Sakurakoji Kinako 桜小路 きな子",
            description: "Sakurakoji Kinako",
            value: "Sakurakoji Kinako",
          },
          {
            label: "Yoneme Mei 米女 メイ",
            description: "Yoneme Mei",
            value: "Yoneme Mei",
          },
          {
            label: "Wakana Shiki 若菜 四季",
            description: "Wakana Shiki",
            value: "Wakana Shiki",
          },
          {
            label: "Onitsuka Natsumi 鬼塚 夏美",
            description: "Onitsuka Natsumi",
            value: "Onitsuka Natsumi",
          }
        )
    );

    const ariseRow = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("ariseIdols")
        .setPlaceholder("Select an idol")
        .addOptions(
          {
            label: "Kira Tsubasa 綺羅 ツバサ",
            description: "Kira Tsubasa",
            value: "Kira Tsubasa",
          },
          {
            label: "Toudou Erena 統堂 英玲奈",
            description: "Toudou Erena",
            value: "Toudou Erena",
          },
          {
            label: "Yuki Anju 優木 あんじゅ",
            description: "Yuki Anju",
            value: "Yuki Anju",
          }
        )
    );

    const saintSnowRow = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("saintSnowIdols")
        .setPlaceholder("Select an idol")
        .addOptions(
          {
            label: "Kazuno Leah 鹿角 理亞",
            description: "Kazuno Leah",
            value: "Kazuno Leah",
          },
          {
            label: "Kazuno Sarah 鹿角 聖良",
            description: "Kazuno Sarah",
            value: "Kazuno Sarah",
          }
        )
    );

    const sunnyPaRow = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("sunnyPaIdols")
        .setPlaceholder("Select an idol")
        .addOptions(
          {
            label: "Hiiragi Mao 柊 摩央",
            description: "Hiiragi Mao",
            value: "Hiiragi Mao",
          },
          {
            label: "Hijirisawa Yuna 聖澤 悠奈",
            description: "Hijirisawa Yuna",
            value: "Hijirisawa Yuna",
          }
        )
    );

    const otherRow = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("otherIdols")
        .setPlaceholder("Select an idol")
        .addOptions(
          {
            label: "Takasaki Yu 高咲 侑",
            description: "Takasaki Yu",
            value: "Takasaki Yu",
          },
          {
            label: "Honoka's Mother 穂乃果の母",
            description: "Honoka's Mother",
            value: "Honoka's Mother",
          },
          {
            label: "Honoka's Father 穂乃果の父",
            description: "Honoka's Father",
            value: "Honoka's Father",
          },
          {
            label: "Kousaka Yukiho 高坂 雪穂",
            description: "Kousaka Yukiho",
            value: "Kousaka Yukiho",
          },
          {
            label: "Ayase Alisa 絢瀬 亜里沙",
            description: "Ayase Alisa",
            value: "Ayase Alisa",
          },
          {
            label: "Kotori's Mother 音ノ木坂学院理事長 (ことりの母)",
            description: "Kotori's Mother",
            value: "Kotori's Mother",
          },
          {
            label: "Umi's Mother 海未の母",
            description: "Umi's Mother",
            value: "Umi's Mother",
          },
          {
            label: "Rin's Mother 凛の母",
            description: "Rin's Mother",
            value: "Rin's Mother",
          },
          {
            label: "Maki's Mother 真姫の母",
            description: "Maki's Mother",
            value: "Maki's Mother",
          },
          {
            label: "Hanayo's Mother 花陽の母",
            description: "Hanayo's Mother",
            value: "Hanayo's Mother",
          },
          {
            label: "Nico's MOther にこの母",
            description: "Nico's MOther",
            value: "Nico's MOther",
          },
          {
            label: "Yazawa Cocoa 矢澤ここあ",
            description: "Yazawa Cocoa",
            value: "Yazawa Cocoa",
          },
          {
            label: "Yazawa Cocoro 矢澤ココロ",
            description: "Yazawa Cocoro",
            value: "Yazawa Cocoro",
          },
          {
            label: "Yazawa Cotaro 矢澤虎太郎",
            description: "Yazawa Cotaro",
            value: "Yazawa Cotaro",
          },
          {
            label: "Chika's Mother 千歌の母",
            description: "Chika's Mother",
            value: "Chika's Mother",
          },
          {
            label: "Takami Mito 高海美渡",
            description: "Takami Mito",
            value: "Takami Mito",
          },
          {
            label: "Takami Shima 高海志満",
            description: "Takami Shima",
            value: "Takami Shima",
          },
          {
            label: "Riko's Mother 梨子の母",
            description: "Riko's Mother",
            value: "Riko's Mother",
          },
          {
            label: "Dia & Ruby's Mother ダイヤ&ルビィの母",
            description: "Dia & Ruby's Mother",
            value: "Dia & Ruby's Mother",
          },
          {
            label: "Watanabe Tsuki 渡辺 月",
            description: "Watanabe Tsuki",
            value: "Watanabe Tsuki",
          }
        )
    );

    try {
      const filter = (interaction) => interaction.isSelectMenu();

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        max: "2",
      });

      collector.on("collect", async (collected) => {
        const value = collected.values[0];
        await collected.deferUpdate();

        switch (value) {
          case "Muse":
            await interaction.editReply({
              components: [museRow],
            });
            break;

          case "Aqours":
            await interaction.editReply({
              components: [aqoursRow],
            });
            break;

          case "Nijigasaki":
            await interaction.editReply({
              components: [nijigasakiRow],
            });
            break;

          case "Leilla":
            await interaction.editReply({
              components: [leillaRow],
            });
            break;

          case "A-Rise":
            await interaction.editReply({
              components: [ariseRow],
            });
            break;

          case "Saint Snow":
            await interaction.editReply({
              components: [saintSnowRow],
            });
            break;

          case "Sunny Passion":
            await interaction.editReply({
              components: [sunnyPaRow],
            });
            break;

          case "Other":
            await interaction.editReply({
              components: [otherRow],
            });
            break;

          default:
            try {
              const res = await axios.get(
                `http://schoolido.lu/api/idols/${value}/`
              );

              const embed = new EmbedBuilder()
                .setColor("#FF4D9C")
                .setTitle(`${res.data.name}'s Information`)
                .setThumbnail(res.data.chibi)
                .addFields(
                  {
                    name: "EN Name",
                    value: `[${res.data.name}](${res.data.website_url})`,
                    inline: true,
                  },
                  {
                    name: "JP Name",
                    value: `[${res.data.japanese_name}](${res.data.website_url})`,
                    inline: true,
                  },
                  {
                    name: "Seiyuu/CV",
                    value: `[${res.data.cv.name}](${res.data.cv_url})`,
                    inline: true,
                  },
                  {
                    name: "School",
                    value: `${res.data.school}`,
                    inline: true,
                  },
                  {
                    name: "Year",
                    value: `${res.data.year}`,
                    inline: true,
                  },
                  {
                    name: "Age",
                    value: `${res.data.age}`,
                    inline: true,
                  },
                  {
                    name: "Birthday",
                    value: `${res.data.birthday}`,
                    inline: true,
                  },
                  {
                    name: "Astrological Sign",
                    value: `${res.data.astrological_sign}`,
                    inline: true,
                  },
                  {
                    name: "Blood Type",
                    value: `${res.data.blood}`,
                    inline: true,
                  },
                  {
                    name: "Height",
                    value: `${res.data.height}`,
                    inline: true,
                  },
                  {
                    name: "Measurements",
                    value: `${res.data.measurements}`,
                    inline: true,
                  },
                  {
                    name: "Favorite Food",
                    value: `${res.data.favorite_food}`,
                    inline: true,
                  },
                  {
                    name: "Least Favorite Food",
                    value: `${res.data.least_favorite_food}`,
                    inline: true,
                  },
                  {
                    name: "Hobbies",
                    value: `${res.data.hobbies}`,
                    inline: true,
                  },
                  {
                    name: "Attribute",
                    value: `${res.data.attribute}`,
                    inline: true,
                  },
                  {
                    name: "Main Unit",
                    value: `${res.data.main_unit}`,
                    inline: true,
                  },
                  {
                    name: "Sub Unit",
                    value: `${res.data.sub_unit}`,
                    inline: true,
                  },
                  {
                    name: "Summary",
                    value: `${res.data.summary}`,
                  }
                )
                .setFooter({
                  text: "Powered by School Idol Tomodachi: https://schoolido.lu/",
                });

              await interaction.channel.send({
                embeds: [embed],
              });
            } catch (error) {
              console.error(error.data);

              await interaction.channel.send({
                content: "This idol does not appear to have any data...",
                ephemeral: true,
              });
            }
            break;
        }
      });

      await interaction.reply({
        components: [unitRow],
      });
    } catch (error) {
      console.error(error);
    }
  },
};
