const qrcode = require("qrcode-terminal");
const dotenv = require("dotenv");
const client = require("..");

dotenv.config();

const qrHandler = (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("QR RECEIVED", qr);
};

const authenticatedHandler = () => {
  console.log("AUTHENTICATED");
};

const unauthenticatedHandler = (msg) => {
  console.error("AUTHENTICATION FAILURE", msg);
};

const readyHandler = () => {
  console.log("Client is ready!");
  client.sendMessage(
    process.env.ADMIN,
    `Server started and will now auto respond to messages.\n*MongoDB RUNNING*\n\n*Started at:* ${new Date().toLocaleString()}`
  );
};

module.exports = {
  qrHandler,
  authenticatedHandler,
  unauthenticatedHandler,
  readyHandler,
};
