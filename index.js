const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const bot = new discord.Client();


bot.on("ready", async () => {

    console.log(`${bot.user.username} is onnline!!!`)
    
    bot.user.setActivity("Porn", {type: "WATCHING"})
})

bot.login(botConfig.token);