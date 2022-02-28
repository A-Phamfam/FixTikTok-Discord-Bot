module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        client.user.setActivity('Use /fixtiktok or Right click and use Apps > Fix Tiktok');
    },
};
