const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const bot = new discord.Client();


bot.on("ready", async () => {

    console.log(`${bot.user.tag} is Online!!!`)

    bot.user.setActivity("gta5", { type: "PLAYING" })

});


bot.on("message", async message => {
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ")

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    if (command === `${prefix}hallo`) {

        return message.channel.send(`Hallo, ${message.author}`);
    }

    if (command === `${prefix}test`) {

        var botEmbed = new discord.RichEmbed()
            .setDescription("hoho")
            .setColor("#1111")
            .addField("Bot Naam:", bot.user.username);

        return message.channel.send(botEmbed);
    }

});


bot.login(botConfig.token);