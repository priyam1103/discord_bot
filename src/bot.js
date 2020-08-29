require("dotenv").config();

const { Client } = require("discord.js");

const client = new Client();
const PREFIX = "$";

client.on("ready", () => {
  console.log(`${client.user.username}`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === "kick") {
      if (args.length === 0) return message.reply("Please provide an ID");
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked`))
          .catch((err) => message.channel.send("I do not have permissions"));
      } else {
        message.channel.send("Opps! member not found");
      }
    } else if (CMD_NAME === "time") {
      let date = new Date();
      message.channel.send(`${date.toLocaleString()}`);
    }
  }
});
client.login(process.env.DISCORDJS_BOT_TOKEN);
