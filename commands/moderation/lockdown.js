const Discord = module.require("discord.js");

module.exports = {
   name: "lock",
   description: "Locks a Channel",
   category: "moderation",
   run: async(client, message, args) => {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.end(":x:You don't have enough Permissions")
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Lockdown")
   .setDescription(`This channel has been locked by a staff member.**You are not muted** 
More information will be sent in this channel.`)
   .setColor("RANDOM")
   .setFooter(`Locked by ${message.author.username}`)
   .setTimestamp();
   await message.channel.send(embed);
   message.delete();
}
}