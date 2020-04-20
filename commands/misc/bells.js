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
        return message.channel.send(embed);
      }

      // See Tagged Users Bells
      member = message.mentions.members.first();
      if (member) {
        User = client.getScore.get(message.mentions.members.first().id, message.guild.id);
        if (!User) {
          return client.error(message.channel, 'No Bells Found!', `<@${message.mentions.members.first().displayName}> has yet to be active in the server.`);
        }
        embed = new Discord.MessageEmbed()
          .setDescription(`<@${message.mentions.members.first().id}> Currently has ${User.points} <:bells:698107158805348373> and is level ${User.level}!`)
          .setColor(client.getRandomColor());
        return message.channel.send(embed);
      }
      return client.error(message.channel, 'Unknown Member!', `Could not find a member by that name!`);
  }
};

module.exports.conf = {
  enabled: true,
  aliases: ['bal'],
  permLevel: 'User',
  cooldown: 10,
};

module.exports.help = {
  name: 'bells',
  category: 'misc',
  description: 'Shows your current Level and Bells on the current server',
  usage: 'bells <@user>',
  details: "<@user> => Only necessary if you're getting the bell amount of another member.",
};