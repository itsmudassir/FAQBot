const restify = require('restify');
const builder = require('botbuilder');
const cognitiveServices = require('botbuilder-cognitiveservices');
require('dotenv').config()

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978,
    function () {
        console.log('%s listening to %s',server.name,server.url);
    }
);

const connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

server.post('/api/messages', connector.listen());

const recognizer = new cognitiveServices.QnAMakerRecognizer({
    knowledgeBaseId: '418821ba-1874-40e4-8769-7b765096b368',
    subscriptionKey: '942bed8c648c4869bd211bd556ce506f',
});

const qnaMakerDialog = new cognitiveServices.QnAMakerDialog({
    recognizers: [recognizer],
    defaultMessage: "Sorry I don't understand the question",
    qnaThreshold: 0.4,
});

var bot = new builder.UniversalBot(connector);

bot.dialog('/', qnaMakerDialog);
