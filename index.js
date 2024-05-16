const dotenv = require("dotenv");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const messageHandler = require("./src/messageHandler");

dotenv.config();

const client = new Client({
  authStrategy: new LocalAuth(),
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

client.initialize();
client.on("qr", (qr) => qrcode.generate(qr, { small: true }));
client.on("authenticated", () => console.log("AUTHENTICATED"));
client.on("auth_failure", (msg) =>
  console.error("AUTHENTICATION FAILURE", msg)
);
client.on("ready", () => {
  console.log("Client is ready!");
  client.sendMessage(
    process.env.ADMIN,
    `Server is listening to messages.\n\n*Started at:* ${new Date().toLocaleString()}`
  );
});

client.on("message", messageHandler);
