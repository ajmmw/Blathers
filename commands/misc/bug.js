exports.run = (client, message, args) => {
  // Check If Custom Channel is Set and Isnt Deleted
  Settings = client.getSetting.get(message.guild.id);
  if (client.channels.cache.get(Settings.misc_channel) && message.channel.id != Settings.misc_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.misc_channel)}.`);

  if (args.length === 0) {
    return client.error(message.channel, 'ERROR', `<@${message.author.id}> please supply the Bug Name.`);
  }
  value = args.slice(0).join(' ');
  Bug = client.getBug.get(value);
  if (!Bug) {
    Bug = DataSQL.prepare("SELECT * FROM bug WHERE name LIKE ? ORDER BY name ASC").all(`%${value}%`);
    let output = `= Results for ${value.toProperCase()} =\n\nPlease use the following to refine your search.\n\n`;
    for (const data of Bug) {
      output += `${data.name.toProperCase()} :: ${data.location}\n`;
    }
    if (Bug == 0) output += `Nothing found :: Try again`;
    return message.channel.send(output, { code: 'asciidoc', split: { char: '\u200b' } })
  }
  embed = new Discord.MessageEmbed()
    .setAuthor(`${Bug.name.toProperCase()}`, null)
    .setDescription(`\`\`\`${Bug.quote}\`\`\``)
    .addField(`Price`, `${Bug.price.toLocaleString()} ${client.emoji.bells}`, true)
    .addField(`Time of Day`, `${Bug.time}`, true)
    .addField(`Location`, `${Bug.location}`, true)
    .addField(`Rarity`, `${Bug.rarity}`, true)
    .addField(`Available (Northern Hemisphere)`, `${Bug.nh}`, false)
    .addField(`Available (Southern Hemisphere)`, `${Bug.sh}`, false)
    .setThumbnail(Bug.image)
    .setColor(client.getRandomColor());
  return message.channel.send(embed);
  
};

module.exports.conf = {
  enabled: true,
  aliases: ['b'],
  permLevel: 'User',
  cooldown: 10
};

module.exports.help = {
  name: 'bug',
  category: 'misc',
  description: 'Lookup a certain bug from the Museum',
  usage: 'bug <name>',
  details: '<name> => The name of the bug required to lookup.'
};