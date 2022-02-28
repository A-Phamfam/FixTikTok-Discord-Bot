const { SlashCommandBuilder } = require('@discordjs/builders');
const getFixDiscordMedia = require('../src/getFixDiscordMedia');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fixmedia')
        .setDescription('Fix discord media video URL so that it will embed')
        .addStringOption((option) => option
            .setName('url')
            .setDescription('media URL')
            .setRequired(true)),
    async execute(client, interaction) {
        const user_url = interaction.options.getString('url');
        let discordMediaURL = await getFixDiscordMedia(user_url);
        if (discordMediaURL) {
            await interaction.reply(discordMediaURL);
        }
        else {
            await interaction.reply({content: 'No discord media video link could be found.', ephemeral: true});
        }
    },
};
