const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs")

const bot = new discord.Client();
bot.command = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`de file ${f} is geladen`);

        bot.command.set(fileGet.help.name, fileGet);

    })

});


bot.on("ready", async () => {

    console.log(`${bot.user.tag} is Online!!!`);

    bot.user.setActivity("spotify", { type: "LISTENING" });

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

        return message.channel.send(`Hallo, ${message.author}, hoe is je dag?`);
    };

    if (command === `${prefix}goed`) {

        return message.channel.send(`Mooi zo heb je nog wat gedaaan vandaag?`);
    };

    if (command === `${prefix}jazeker`) {

        return message.channel.send(`Oh? vertel wat heb je gedaan?..`);
    };

    if (command === `${prefix}ik..`) {

        return message.channel.send(`Mooi.. ik hoop dat het leuk was :)`);
    };

    if (command === `${prefix}slecht`) {

        return message.channel.send(`Oh nee wat is er??`);
    };

    if (command === `${prefix}nou..`) {

        return message.channel.send(`Ik hoop dat het beter gaat`);
    };


    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, arguments);


    if (command === `${prefix}info`) {

        var botIcon = bot.user.displayAvatarURL;

        var botEmbed = new discord.RichEmbed()
            .setColor("#42f5d1")
            .setTitle("Bot Info")
            .setDescription("Dit is de info van J.J BOT")
            .addField("Bot Naam:", bot.user.username)
            .addField("Gemaakt op", bot.user.createdAt)
            .addField("Bot is gemaakt door", "jacco en jayjay")
            .addField("Commands van de bot typ dan", "b.commands")
            .addField("meer weten over de bot vraag dan", "@Ghost_Assassin#7506")
            .addField("Info aangevraagd door", message.author);

        return message.channel.send(botEmbed);

    }

    if (command === `${prefix}sinfo`) {

        var icon = message.guild.iconURL;

        var serverEmbed = new discord.RichEmbed()
            .setDescription("sever info")
            .setColor("#42f5d1")
            .setThumbnail(icon)
            .addField("Bot Naam:", bot.user.username)
            .addField("Je bent gejoind op", message.member.joinedAt)
            .addField("Totaal leden", message.guild.memberCount);

        return message.channel.send(serverEmbed);

    }

    if (command === `${prefix}kick`) {

        // !kick @Ghost_Assassin redenen hier.

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.member(arguments[0]));

        if (!kickUser) return message.channel.send("Gebruiker is niet gevonden");

        var reason = arguments.join(" ").slice(22);

        if (!message.member.hasPermission("KICK_MEMBER")) return message.channel.send("Je hebt geen permissions om dit uit tevoeren");

        if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Deze gebruiker kan je niet kicken");

        var kick = new discord.RichEmbed()
            .setDescription("kick")
            .setColor("#ee0000")
            .addField("kicked gebruiker", kickUser)
            .addField("Gekickd door", message.author)
            .addField("reden", reason);

        var kickChannel = message.guild.channels.find(r => r.name === "reports");
        if (!kickChannel) return message.channel.send("Kan het kanaal niet vinden");

        message.guild.member(kickUser).kick(reason);

        message.channel.send(kick);

        return message.channel.send("Gebruiker is gekicked.");

    }

});


bot.login(botConfig.token);