const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");

    var commandsList = {};
    var mode = (s.MODE).toLocaleLowerCase() !== "yes" ? "private" : "public";

    cm.map((com) => {
        if (!commandsList[com.categorie]) commandsList[com.categorie] = [];
        commandsList[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');

    const time = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
╭━━✧𝐂𝐑𝐈𝐒𝐒  𝐕𝐌𝐃✧━━❖
┊✺┌────••••────⊷
┃✇│◎ 𝙾𝚠𝚗𝚎𝚛 : ${s.OWNER_NAME}
┃✇│◎ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${s.PREFIXE} ]
┃✇│◎ 𝙼𝚘𝚍𝚎 : ${mode}
┃✇│◎ 𝚁𝚊𝚖  : 8/132 GB
┃✇│◎ 𝙳𝚊𝚝𝚎  : ${date}
┃✇│◎ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()}
┃✇│◎ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : 𝐂𝐑𝐈𝐒𝐒 
┃✇│◎ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : ${cm.length}
┃✇│ 𝚃𝚑𝚎𝚖𝚎 : 𝐕𝐄𝐕𝐎
┊   └────••••────⊷
╰━━✧𝐂𝐑𝐈𝐒𝐒  𝐕𝐌𝐃✧━━━◆ \n`;

    let menuMsg = ``;

    for (const category in commandsList) {
        menuMsg += `
╭━━━❂ ${category} ❂⁠⁠⁠⁠━━─••
║╭━━══••══━━••⊷ `;
        for (const cmd of commandsList[category]) {
            menuMsg += `          
║┊◆ ${s.PREFIXE}  *${cmd}*`;
        }
        menuMsg += `
║╰━━══••══━━••⊷
╰════────════◆◆◆`;
    }

    menuMsg += `\n> @𝐌𝐀𝐃𝐄 𝐁𝐘 𝐂𝐑𝐈𝐒𝐒 𝐕𝐄𝐕𝐎`;

    var imageUrl = mybotpic();

    try {
        if (imageUrl.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, { video: { url: imageUrl }, caption: infoMsg + menuMsg, gifPlayback: true }, { quoted: ms });
        } else if (imageUrl.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, { image: { url: imageUrl }, caption: infoMsg + menuMsg }, { quoted: ms });
        } else {
            repondre(infoMsg + menuMsg);
        }

        // Download and send audio
        const audioUrl = "https://files.catbox.moe/xci982.mp3";
        const audioPath = "./temp_audio.mp3";

        const response = await axios({
            url: audioUrl,
            method: "GET",
            responseType: "stream",
        });

        const writer = fs.createWriteStream(audioPath);
        response.data.pipe(writer);

        writer.on("finish", async () => {
            await zk.sendMessage(dest, { audio: { url: audioPath }, mimetype: "audio/mp4", ptt: true }, { quoted: ms });
            fs.unlinkSync(audioPath); // Delete the audio file after sending
        });

    } catch (e) {
        console.log("🥵🥵 Menu error: " + e);
        repondre("🥵🥵 Menu error: " + e);
    }
});
