module.exports = (client, message) => {
  if (!message.guild || message.author.bot) return;
  if (!message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])) return;
  //Bot is Mentioned
  if (message.mentions.has(client.user)) {
    return message.reply("Hey there! My prefix is `;`. Use the `;help` command to find out more about me!");
  }

  // Start Leveling
  let score;
  score = client.getScore.get(message.author.id, message.guild.id);
  if (!score) {
    score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, name: message.author.username, points: 0, level: 1 }
  }
  score.name = message.author.username;
  score.points++;
  const curLevel = Math.floor(0.2 * Math.sqrt(score.points));
  if (score.level < curLevel) {
    score.level++;
    embed = new Discord.MessageEmbed()
      .setDescription(`<@${message.author.id}>, You've leveled up to level **${curLevel}**! Ain't that dandy? <a:leafrainbow:700145511012761690>`)
      .setColor(client.getRandomColor());
    message.channel.send(embed).catch(error => { console.error('LEVEL UP', error); });
  }
  client.setScore.run(score);

  //Start Command Lookup
  if (message.content.indexOf(client.config.prefix) !== 0) return;
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (!cmd) return;
  cmd.run(client, message, args);
};