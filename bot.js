const builder = require('botbuilder');

const connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// set up default dialog to use QnA Maker
const bot = new builder.UniversalBot(connector, require('./qnadialog.js'));

module.exports = bot;
