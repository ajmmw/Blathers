exports.run = (client, message, args) => {
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  embed = new Discord.MessageEmbed()
    .setTitle('Click to invite')
    .setURL('https://discordapp.com/api/oauth2/authorize?client_id=598007871720128544&permissions=387072&scope=bot')
    .setDescription(`<@${message.author.id}> so you want me to visit your server? Please do so by clicking the invite link.`)
    .setColor(getRandomColor());
  return message.channel.send(embed).catch(error => { console.error('INVITE COMMANMD', error); });
}