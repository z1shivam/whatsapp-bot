const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

client.initialize();

client.on('loading_screen', (percent, message) => {
  console.log('LOADING SCREEN', percent, message);
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on('auth_failure', msg => {
  console.error('AUTHENTICATION FAILURE', msg);
});

client.on("ready", () => {
  console.log("Client is ready!");
  client.sendMessage(`919797359032@c.us`, `Server started at ${new Date().toLocaleString()}.`);
});

client.on("message", (message) => {
  console.log(message);
  const replyMessage = `Hi ${message._data.notifyName.split(" ")[0]}!, This is an auto-generated message. I am currently not available. I will get back to you soon. Thanks!`;
  client.sendMessage(message.from, replyMessage);
});