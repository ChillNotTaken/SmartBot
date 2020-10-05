const Discord = module.require("discord.js");

module.exports = {
   name: "lock",
   description: "Locks a Channel",
   category: "moderation",
   run: async(client, message, args) => {
   if (!message.member.hasPermission('MANAGE_GUILD') || !message.member.hasPermission('MANAGE_CHANNELS')) {
   return message.channel.send(":x: You don't have enough Permissions")
   }
  const reason = args.join(' ') || 'no reason'
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ], reason);
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`<a:drop_tick:755335555402956800>${message.channel} has been Locked by a staff member 
 more updates will be send in this channel **You Are Not Muted**
\nReason: ${reason}`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}
}