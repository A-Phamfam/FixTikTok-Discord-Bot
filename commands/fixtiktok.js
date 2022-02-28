const { SlashCommandBuilder } = require('@discordjs/builders');
const getFixtiktokURL = require('../src/getFixtiktokURL');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fixtiktok')
        .setDescription('Fix tiktok URL so that it will embed')
        .addStringOption((option) => option
            .setName('url')
            .setDescription('tiktok URL')
            .setRequired(true)),
    async execute(client, interaction) {
        const user_url = interaction.options.getString('url');
        const fixtiktokURL = await getFixtiktokURL(user_url);
        if (fixtiktokURL) {
            await interaction.reply(fixtiktokURL);
        }
        else {
            await interaction.reply({content: 'No tiktok link could be found.', ephemeral: true});
        }
    },
};
