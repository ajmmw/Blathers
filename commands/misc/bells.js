exports.run = (client, message, args) => {
  User = client.getScore.get(message.author.id, message.guild.id);
  if (!User) return;
  embed = new Discord.MessageEmbed()
    .setDescription(`<@${message.author.id}>, You currently have ${User.points} <:bells:698107158805348373> and are level ${User.level}!`)
    .setColor(client.getRandomColor());
  return message.channel.send(embed).catch(error => { console.error('BELLS COMMANMD', error); });
};

module.exports.help = {
  name: 'bells',
  category: 'misc',
  description: 'Shows your current Level and Bells on the current server.',
  usage: ';bells',
  aliases: ['bal'],
};