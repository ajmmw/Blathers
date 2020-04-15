exports.run = (client, message, args) => {
  User = client.getScore.get(message.author.id, message.guild.id);
  if (!User) return;
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  embed = new Discord.MessageEmbed()
    .setDescription(`<@${message.author.id}>, You currently have ${User.points} <:bells:698107158805348373> and are level ${User.level}!`)
    .setColor(getRandomColor());
  return message.channel.send(embed).catch(error => { console.error('BELLS COMMANMD', error); });
}