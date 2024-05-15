const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
  webVersionCache: {
    type: "remote",
    remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

client.initialize();
client.on("qr", (qr) => qrcode.generate(qr, { small: true }));
client.on("authenticated", () => console.log("AUTHENTICATED"));
client.on('auth_failure', msg => console.error('AUTHENTICATION FAILURE', msg));
client.on("ready", () => console.log("Client is ready!"));

client.on("message", (message) => {
  const nameOfSender = message._data.notifyName.split(" ")[0];
  client.sendMessage(message.from, `Hi ${nameOfSender}!, This is an auto-generated message. I am currently not available. I will get back to you soon. Thanks!`);
});
