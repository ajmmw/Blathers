exports.run = (client, message, args) => {
  const top10 = UserSQL.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const embed = new Discord.MessageEmbed()
    .setTitle("Leaderboard")
    .setDescription("Our top 10 Bell leaders!")
    .setThumbnail(`https://pnkllr.net/projects/Lloid/balloon_float.gif`)
    .setColor(getRandomColor());

  for (const data of top10) {
    embed.addField(`${data.name}`, `${data.points} Bells (level ${data.level})`);
  }
  return message.channel.send(embed).catch(error => { console.error('TOP COMMANMD', error); });
}