const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const bot = new discord.Client();


bot.on("ready", async () => {

    console.log(`${bot.user.tag} is Online!!!`);

    bot.user.setActivity("gta5", { type: "PLAYING" });

});


bot.on("message", async message => {

    // Als bot bericht stuurt stuur dan return
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    if (command === `${prefix}hallo`) {

        return message.channel.send(`Hallo, ${message.author}.`);
    }

    if (command === `${prefix}info`) {

        var botEmbed = new discord.RichEmbed()
            .setDescription("bot info")
            .setColor("#1111")
            .addField("Bot Naam:", bot.user.username);
             message.channel.send(botEmbed);
            
            message.channel.send(botEmbed);

        return;
    }

});


bot.login(botConfig.token);