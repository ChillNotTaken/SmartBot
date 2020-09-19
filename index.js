const Discord = require("discord.js");
const fs = require("fs");
const { Prefix, Token, Owner_ID, Color } = require("./config.json");
if (Prefix === null) Prefix = `!`;
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.descriptions = new Discord.Collection();

client.on("ready", async () => {
    console.log(`Bot Is Ready To Go & Online!`);
    client.user.setActivity(`Chillplayz On Youtube`);
});

let modules = ["fun", "moderation", "Utility", "verification"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(err, files) {
    if (err) console.log(err);
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      let command = require(`./commands/${module}/${file}`);
      console.log(`${command.name} - Status - ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.description) {
        client.descriptions.set(command.description, command.description);
      }
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
    });
  });
});

client.on('message', message => {

    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.guild) return;
  
    let roleid = '752271468485935136'
    let channelid = '752271438429552660'
    if (message.channel.id === channelid && !message.member.roles.cache.get(roleid)) {
      message.member.roles.add(roleid)
    }

  if (message.content.match(new RegExp(`<@!?${client.user.id}>`))) {
    let embed = new Discord.MessageEmbed()
    .setDescription('my prefix is ``+`` or whatever i am guessing thats why you tagged me For More Information Use ``+Help`` ')
    .setColor('#eefe00')
    return message.channel.send(embed)
  }

  
    if (!message.content.startsWith(Prefix)) return;

    try {

      let messageArray = message.content.split(` `);
      let args = messageArray.slice(1);
      let cmd = messageArray[0].toLowerCase();

      let command =
        client.commands.get(cmd.slice(Prefix.length)) ||
        client.commands.get(client.aliases.get(cmd.slice(Prefix.length)));

      if (command) {
        if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`I Don't Have Permission To Use This Or Any Command! | Require : Administrator / Admin`)
        command.run(client, message, args);
      }
    } catch (error) {
        console.log(error);
        message.channel.send(`Error In Command Try Again Later!\nThank You!`);
    }
});

//Login
client.login(process.env.token);
