const dotenv = require("dotenv");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

dotenv.config();

function getDetails(msg) {
  if (msg.from.length > 18) {
    return {
      groupId: msg.from,
      numberId: msg.author,
      senderName: msg._data.notifyName,
      body: msg.body,
    };
  }
  return {
    numberId: msg.from,
    senderName: msg._data.notifyName,
    body: msg.body,
  };
}

// client stuffs
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
client.on("authenticated", () => console.log("Authentication Successful!"));
client.on("auth_failure", () => console.log("Authentication Failed!"));
client.on("ready", () => {
  console.log("Client is ready!");
  client.sendMessage(
    process.env.ADMIN,
    `Server started and will now auto respond to messages.\n*MongoDB RUNNING*\n\n*Started at:* ${new Date().toLocaleString()}`
  );
});

client.on("message", (msg) => {
  if (msg.author) {
    const { groupId, numberId, senderName, body } = getDetails(msg);
    console.log(
      `A new message from ${senderName} (${numberId}) in group ${body}`
    );
    client.sendMessage(groupId, "sending a message in a group");
  } else if (!msg.author) {
    const { numberId, senderName, body } = getDetails(msg);
    console.log(
      `A new message from ${senderName} (${numberId}) with message: ${body}`
    );
    client.sendMessage(numberId, "sending a message to a user");
  }
});
