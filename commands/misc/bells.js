exports.run = (client, message, args) => {
  switch (args[0]) {
    // Dsiplay Your Bells
    default:
      if (args.length === 0) {
        User = client.getScore.get(message.author.id, message.guild.id);
        if (!User) return;
        embed = new Discord.MessageEmbed()
          .setDescription(`<@${message.author.id}>, You currently have ${User.points} <:bells:698107158805348373> and are level ${User.level}!`)
          .setColor(client.getRandomColor());
        return message.channel.send(embed).catch(error => { console.error('BELLS COMMANMD', error); });
      }

      // See Tagged Users Bells
      member = message.mentions.members.first();
      if (member) {
        User = client.getScore.get(message.mentions.members.first().id, message.guild.id);
        if (!User) {
          embed = new Discord.MessageEmbed()
            .setDescription(`**No Bells Found!**\n<@${message.mentions.members.first().id}> has yet to be active in the server.`)
            .setColor(0xFF0000);
          return message.channel.send(embed);
        }
        embed = new Discord.MessageEmbed()
        .setDescription(`<@${message.mentions.members.first().id}> Currently has ${User.points} <:bells:698107158805348373> and is level ${User.level}!`)
          .setColor(client.getRandomColor());

        return message.channel.send(embed);
      }

      embed = new Discord.MessageEmbed()
        .setDescription(`**Unknown Member!**\nCould not find a member by that name!`)
        .setColor(0xFF0000);
      return message.channel.send(embed);
  }
};

module.exports.help = {
  name: 'bells',
  category: 'misc',
  description: 'Shows your current Level and Bells on the current server.',
  usage: ';bells',
  aliases: ['bal'],
};