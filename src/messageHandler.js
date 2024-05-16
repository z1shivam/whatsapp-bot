function messageHandler(client, msg) {
  console.log(msg);
  client.sendMessage(
    msg.from,
    "Hello! I am a bot. I am currently not available. Please try again later."
  );
}

module.exports = { messageHandler };