const getFixtiktokURL = require('../src/getFixtiktokURL');
const getFixDiscordMedia = require('../src/getFixDiscordMedia');

module.exports = {
    name: 'messageCreate',
    async execute(client, msg) {
        if (msg.author.bot) {
            return;
        }

        if (!msg.inGuild()) {
            return;
        }

        let fixtiktokURL = getFixtiktokURL(msg.content);
        if (fixtiktokURL) {
            msg.channel.send(fixtiktokURL);
        }

        let discordMediaURL = getFixDiscordMedia(msg.content);
        if (discordMediaURL) {
            msg.channel.send(discordMediaURL);
        }

    },
};
