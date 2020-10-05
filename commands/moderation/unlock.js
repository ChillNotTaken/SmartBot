const Discord = module.require("discord.js");

module.exports = {
   name: "unlock",
   description: "Unlocks a Channel",
   category: "moderation",
   run: async(client, message, args) => {
   if (!message.member.hasPermission('MANAGE_GUILD', 'MANAGE_CHANNELS')) {
   return message.channel.send(":x: You don't have enough Permissions")
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        null : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`<a:drop_tick:755335555402956800> ${message.channel}  has been Unlocked by a staff member
You may talk now.`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}
}