const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: Criss_Criss,    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function CRISS_VEVO_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let Pair_Code_By_Criss_Vevo = Criss_Vevo({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Chrome (Linux)", "", ""]
             });
             if(!Pair_Code_By_Criss_Vevo.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await Pair_Code_By_Criss_Vevo.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            Pair_Code_By_Criss_Vevo.ev.on('creds.update', saveCreds)
            Pair_Code_By_Criss_Vevo.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(5000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                await delay(800);
               let b64data = Buffer.from(data).toString('base64');
               let session = await Pair_Code_By_Criss_Vevo.sendMessage(Pair_Code_By_Criss_Vevo.user.id, { text: '' + b64data });

               let CRISS_VEVO_TEXT = `
┏━━━━━━━━━━━━━━
┃ᴍᴀʟᴠCRISS VEVO SESSION IS 
┃SUCCESSFULLY
┃CONNECTED ✅🔥
┗━━━━━━━━━━━━━━━
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❶ || Creator = 𖥘⚡ CRISS VEVO ⚡𖥘
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❷ || https://whatsapp.com/channel/0029Vb0HIV2G3R3s2II4181g
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❸ || Owner = https://wa.me/message/NY5RNQQH2DYTN1
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❺ || Bot Repo = https://github.com/criss-vevo/CRISS-VMD
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❻ || YouTube = https://youtube.com/@criss_vevo?si=S8WAlQgx37kI0iK_ 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
©2024-2099 ᴍᴀʟᴠɪɴ-ᴋɪɴɢ_`
 await Pair_Code_By_Criss_Vevo.sendMessage(Pair_Code_By_Criss_Vevo.user.id,{text:CRISS_VEVO_TEXT},{quoted:session})
 

        await delay(100);
        await Pair_Code_By_Criss_Vevo.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    CRISS_VEVO_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await CRISS_VEVO_PAIR_CODE()
});
module.exports = router
