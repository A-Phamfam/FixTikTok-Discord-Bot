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

        if (client.serverDisabledSettings['autofix'].includes(msg.guildId)) {
            return;
        }

        let fixtiktokURL = await getFixtiktokURL(msg.content);
        if (fixtiktokURL) {
            const author = (client.serverDisabledSettings['author_ping'].includes(msg.guildId))
                ? msg.author.tag : `<@${msg.author.id}>`
            await msg.channel.send(`Fixed TikTok URL from ${author} \n${fixtiktokURL}`);

            if (client.serverDisabledSettings['delete_original'].includes(msg.guildId)) {
                return;
            }
            await msg.delete()
        }

        let discordMediaURL = await getFixDiscordMedia(msg.content);
        if (discordMediaURL) {
            const author = (client.serverDisabledSettings['author_ping'].includes(msg.guildId))
                ? msg.author.tag : `<@${msg.author.id}>`
            await msg.channel.send(`Fixed video URL from ${author} \n${discordMediaURL}`);

            if (client.serverDisabledSettings['delete_original'].includes(msg.guildId)) {
                return;
            }
            await msg.delete()
        }

    },
};
