
const getFixDiscordMedia = function (oldURL) {
    const tokens = /https:\/\/media\.discordapp\.net\/attachments\/(\w+\/\w+\/\w+.mp4)/.exec(oldURL);
    if (!tokens) {
        return;
    }
    const mediaAttachmentID = tokens[1];

    return `https://cdn.discordapp.com/attachments/${mediaAttachmentID}`;
};

module.exports = getFixDiscordMedia;