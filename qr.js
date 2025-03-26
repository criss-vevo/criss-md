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
	default: Eliah_Tech,
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

// HTML template for QR display
const getHtmlTemplate = (qrDataURL) => `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Criss Md QR Code</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		body {
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 100vh;
			background: #000;
			font-family: 'Poppins', sans-serif;
			position: relative;
			overflow: hidden;
		}

		/* Animated Background */
		body::before {
			content: '';
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: url('https://files.catbox.moe/8gczib.jpg') center/cover;
			opacity: 0.1;
			animation: backgroundZoom 20s infinite alternate;
			z-index: -1;
		}

		@keyframes backgroundZoom {
			0% { transform: scale(1); }
			100% { transform: scale(1.2); }
		}

		.container {
			text-align: center;
			padding: 2rem;
			background: rgba(0, 0, 0, 0.8);
			border-radius: 20px;
			box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
			backdrop-filter: blur(10px);
			animation: containerGlow 2s infinite alternate;
		}

		@keyframes containerGlow {
			0% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.3); }
			100% { box-shadow: 0 0 40px rgba(0, 255, 0, 0.6); }
		}

		.profile-pic {
			width: 120px;
			height: 120px;
			border-radius: 50%;
			margin: 0 auto 20px;
			overflow: hidden;
			border: 3px solid #00ff00;
			animation: spin 10s linear infinite;
		}

		.profile-pic img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		@keyframes spin {
			0% { transform: rotate(0deg); }
			100% { transform: rotate(360deg); }
		}

		h1 {
			color: #00ff00;
			margin-bottom: 20px;
			font-size: 2rem;
			text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
		}

		.qr-container {
			background: white;
			padding: 20px;
			border-radius: 10px;
			display: inline-block;
			margin: 20px 0;
			position: relative;
			overflow: hidden;
		}

		.qr-container::before {
			content: '';
			position: absolute;
			top: -50%;
			left: -50%;
			width: 200%;
			height: 200%;
			background: linear-gradient(
				45deg,
				transparent,
				rgba(0, 255, 0, 0.1),
				transparent
			);
			animation: shine 2s infinite;
		}

		@keyframes shine {
			0% { transform: translateX(-100%) rotate(45deg); }
			100% { transform: translateX(100%) rotate(45deg); }
		}

		.qr-code {
			display: block;
			margin: 0 auto;
			max-width: 300px;
			height: auto;
		}

		.status {
			color: #00ff00;
			margin-top: 20px;
			font-size: 1.2rem;
		}

		/* Floating particles */
		.particles {
			position: fixed;
			width: 100%;
			height: 100%;
			pointer-events: none;
		}

		.particle {
			position: absolute;
			width: 3px;
			height: 3px;
			background: #00ff00;
			border-radius: 50%;
			animation: float 3s infinite linear;
		}

		@keyframes float {
			0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
			100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
		}

		@media (max-width: 500px) {
			.container {
				width: 90%;
				padding: 1rem;
			}
			
			.qr-code {
				width: 100%;
				max-width: 250px;
			}
		}
	</style>
</head>
<body>
	<div class="particles"></div>
	<div class="container">
		<div class="profile-pic">
			<img src="https://files.catbox.moe/8gczib.jpg" alt="Criss">
		</div>
		<h1>CRISS VMD QR CODE</h1>
		<div class="qr-container">
			<img src="${qrDataURL}" alt="QR Code" class="qr-code">
		</div>
		<div class="status">Scan This QR Code With WhatsApp</div>
	</div>
	<script>
		// Create floating particles
		function createParticles() {
			const particles = document.querySelector('.particles');
			for(let i = 0; i < 30; i++) {
				const particle = document.createElement('div');
				particle.className = 'particle';
				particle.style.left = Math.random() * 100 + '%';
				particle.style.animationDelay = Math.random() * 2 + 's';
				particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
				particles.appendChild(particle);
			}
		}
		createParticles();
	</script>
</body>
</html>
`;

router.get('/', async (req, res) => {
	const id = makeid();
	async function Elitechwiz_Md_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Eliah_Tech = Eliah_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Eliah_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_Eliah_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				
				if (qr) {
					// Convert QR to data URL
					const qrDataURL = await QRCode.toDataURL(qr);
					// Send complete HTML page
					res.send(getHtmlTemplate(qrDataURL));
				}

				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
					let b64data = Buffer.from(data).toString('base64');
					let session = await Qr_Code_By_Eliah_Tech.sendMessage(Qr_Code_By_Eliah_Tech.user.id, { text: '' + b64data });

					let Elitechwiz_Md_TEXT = `
╭───────────────━⊷
┊𝐂𝐑𝐈𝐒𝐒 𝐌𝐃 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃
╰───────────────━⊷
╭───────────────━⊷
║🔗 𝗚𝗜𝗧𝗛𝗨𝗕 𝗟𝗜𝗡𝗞
║> https://shorturl.at/VIcZ7
║
║🔗 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗖𝗛𝗔𝗡𝗡𝗘𝗟
║> https://shorturl.at/10YNe
⁠⁠⁠⁠╰───────────────━⊷
   𝗙𝗢𝗟𝗟𝗢𝗪 𝗠𝗬 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 𝗙𝗢𝗥 𝗠𝗢𝗥𝗘 𝗜𝗡𝗙𝗢
  
> 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗖𝗥𝗜𝗦𝗦 𝗩𝗘𝗩𝗢`
					await Qr_Code_By_Eliah_Tech.sendMessage(Qr_Code_By_Eliah_Tech.user.id,{text:Elitechwiz_Md_TEXT},{quoted:session})

					await delay(100);
					await Qr_Code_By_Eliah_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					Elitechwiz_Md_QR_CODE();
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
	return await Elitechwiz_Md_QR_CODE()
});
module.exports = router
