exports.run = (client, message, args) => {
  embed = new Discord.MessageEmbed()
    .setTitle('Click to invite')
    .setURL('https://discordapp.com/api/oauth2/authorize?client_id=598007871720128544&permissions=387072&scope=bot')
    .setDescription(`<@${message.author.id}> so you want me to visit your server? Please do so by clicking the invite link.`)
    .setColor(client.getRandomColor());
  return message.channel.send(embed).catch(error => { console.error('INVITE COMMANMD', error); });
};

module.exports.help = {
  name: 'invite',
  category: 'info',
  description: 'Displays and link to invite the bot to your own server.',
  usage: ';invite',
  aliases: ['inv', 'add'],
};