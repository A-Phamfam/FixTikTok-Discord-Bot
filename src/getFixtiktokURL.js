
const getFixtiktokURL = function (oldURL) {

    let tokens = /https:\/\/vm.tiktok.com\/(\w+)\//.exec(oldURL);
    if (tokens !== null && tokens.length >= 2) {
        const tiktokID = tokens[1];
        return `https://vm.fixtiktok.com/${tiktokID}/`;
    }

    tokens = /https:\/\/www\.tiktok\.com\/(@\w+\/video\/\w+)/.exec(oldURL);
    if (tokens !== null && tokens.length >= 2) {
        const tiktokID = tokens[1];
        return `https://www.fixtiktok.com/${tiktokID}/`;
    }
};

module.exports = getFixtiktokURL;