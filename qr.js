const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Criss_Vevo,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function CRISS_VEVO_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Criss_Vevo = Criss_Vevo({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Criss_Vevo.ev.on('creds.update', saveCreds)
			Qr_Code_By_Criss_Vevo.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Criss_Vevo.sendMessage(Qr_Code_By_Criss_Vevo.user.id, { text: '' + b64data });
	
				   let CRISS_VEVO_TEXT = `
┏━━━━━━━━━━━━━━
┃CRISS VEVO SESSION IS 
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
©2025-2099 CRISS VEVO_`
	 await Qr_Code_By_Criss_Vevo.sendMessage(Qr_Code_By_Criss_Vevo.user.id,{text:CRISS_VEVO_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Criss_Vevo.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					CRISS_VEVO_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await CRISS_VEVO_QR_CODE()
});
module.exports = router
