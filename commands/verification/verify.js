const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "verify",
  description: "verify new members",
  usage: "verify",
  category: "verification for unverified members",
  run: async (client, message, args) => {
    if (message.channel.id !== '752826586029490196') return
    if (message.member.roles.cache.get('749631622105661541')) return
    await message.member.roles.add('749631622105661541')
    await message.channel.send("<a:drop_tick:755335555402956800>You Have Been successfully verified in **Chill's world**")
  }
}


