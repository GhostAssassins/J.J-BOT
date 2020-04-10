const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const bot = new discord.Client();


bot.on("ready", async () => {

    console.log(`${bot.user.tag} is Online!`);

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
    };


    if (command === `${prefix}info`) {

        var botIcon = bot.user.displayAvatarURL;

        var botEmbed = new discord.RichEmbed()
            .setDescription("bot info")
            .setColor("#42f5d1")
            .setThumbnail(botIcon)
            .addField("Bot Naam:", bot.user.username)
            .addField("Gemaakt op", bot.user.createdAt);

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
            .addField("Totaal members", message.guild.memberCount);

        return message.channel.send(serverEmbed);

    }

    if (command === `${prefix}kick`) {

        // !kick @Ghost_Assassin redenen hier.

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.member(arguments[0]));

        if (!kickUser) return message.channel.send("Gebruiker is niet gevonden");

        var reason = arguments.join(" ").slice(22);

        if (message.member.hasPermission("KICK_MEMBER")) return message.channel.send("Je hebt geen permissions om dit uit tevoeren");

        if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Deze gebruiker kan je niet kicken");

        var kick = new discord.RichEmbed()
            .setDescription("kick")
            .setColor("#ee0000")
            .addField("kicked gebruiker", kickUser)
            .addField("Gekickd door", message.author)
            .addField("reden", reason);

        var kickChannel = message.guild.channels.find(r => r.name === "reports");
        if (kickChannel) return message.guild.send("Kan het kanaal niet vinden");

        message.guild.member(kickUser).kick(reason);

        kickChannel.send(kick);

        return;

    }

});


bot.login(botConfig.token);