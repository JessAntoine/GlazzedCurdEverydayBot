const {Client, Intents} = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS]});

const fs = require('fs');

const imgCount = fs.readdirSync("./img").length - 1;

const textChatID = "792985400364892180";

let config = require('./config.json');
//let token = config.token;

let bCurdWasSended = false;

bot.on("ready", function() {
    console.log(bot.user.username + " is ready!");
    console.log("img count = " + imgCount);
    RestartTimeChecker();

});

bot.on('message', (msg) => {

});

function RestartTimeChecker()
{
    setTimeout(CheckTime, 45 * 1000);
}

function CheckTime()
{
    let UTCHours = new Date().getUTCHours();
    //let UTCMin = new Date().getUTCMinutes();
    // console.log("min = " + UTCMin);

    // if ((UTCMin === 35 || UTCMin == 40) && !bCurdWasSended)
    // {
    //     bCurdWasSended = true;
    //     bot.channels.cache.get(textChatID).send({files : ["./img/img" + GetRandomIntInRange(imgCount).toString() + ".jpeg"]});
    //     console.log("*Curd was sended!");
    // }
    // else
    // {
    //     if (bCurdWasSended && (UTCHours != 35 && UTCMin != 40))
    //         bCurdWasSended = false;
    // }

    // RestartTimeChecker();

    // return;
    // UTC - 5 = 11 у нас
    if (UTCHours === 5 && !bCurdWasSended)
    {
        bCurdWasSended = true;
        bot.channels.cache.get(textChatID).send({files : ["./img/img" + GetRandomIntInRange(imgCount).toString() + ".jpeg"]});
        console.log("*Curd was sended!");
    }
    else
    {
        if (bCurdWasSended && UTCHours != 17)
            bCurdWasSended = false;
    }

    RestartTimeChecker();
}

function GetRandomIntInRange(min = 0, max = 0)
{
    // Можно указать только один аргумент, чтобы получить рандомное число от 0 до указанного
    if (min > 0 && max === 0)
    {
        return Math.floor(Math.random() * min);
    }

    // Что-то пошло не так и поменяли минимальное и максимальное значения местами
    else if (min > max)
    {
        // Свапаем значения местами
        min = [max, max = min][0];
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
}

bot.login(process.env.BOT_TOKEN);
