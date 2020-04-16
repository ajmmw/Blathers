exports.run = (client, message, args) => {
  const top10 = UserSQL.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
  const embed = new Discord.MessageEmbed()
    .setTitle("Leaderboard")
    .setDescription("Our top 10 Bell leaders!")
    .setThumbnail(`https://pnkllr.net/projects/Lloid/balloon_float.gif`)
    .setColor(client.getRandomColor());

  for (const data of top10) {
    embed.addField(`${data.name}`, `${data.points} Bells (level ${data.level})`);
  }
  return message.channel.send(embed).catch(error => { console.error('TOP COMMANMD', error); });
};

module.exports.help = {
  name: 'top',
  category: 'misc',
  description: 'Display the current Top10 users with the most Bells on the server.',
  usage: ';top',
  aliases: ['ladder'],
};