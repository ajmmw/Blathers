exports.run = (client, message, args) => {
  // Check If Custom Channel is Set and Isnt Deleted
  Settings = client.getSetting.get(message.guild.id);
  if (client.channels.cache.get(Settings.misc_channel) && message.channel.id != Settings.misc_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.misc_channel)}.`);

  if (args.length === 0) {
    return client.error(message.channel, 'ERROR', `<@${message.author.id}> please supply the Sea Creature Name.`);
  }
  value = args.slice(0).join(' ');
  if (value.length < 3) return client.error(message.channel, 'ERROR', `<@${message.author.id}> please provide a longer name to search.`);
  Sea = client.getSea.get(value);
  if (!Sea) {
    Sea = DataSQL.prepare("SELECT * FROM sea WHERE name LIKE ? ORDER BY name ASC").all(`%${value}%`);
    let output = `= Results for ${value.toProperCase()} =\n\nPlease use the following to refine your search.\n\n`;
    for (const data of Sea) {
      output += `${data.name.toProperCase()} :: ${data.species}\n`;
    }
    if (Sea == 0) output += `Nothing found :: Try again`;
    return message.channel.send(output, { code: 'asciidoc', split: { char: '\u200b' } })
  }
  embed = new Discord.MessageEmbed()
    .setAuthor(`${Sea.name.toProperCase()}`, null)
    .setDescription(`\`\`\`${Sea.quote}\`\`\``)
    .addField(`Price`, `${Sea.price.toLocaleString()} ${client.emoji.bells}`, true)
    .addField(`Shadow Size`, `${Sea.shadow}`, true)
    .addField(`Movement`, `${Sea.swim_pattern}`, true)
    .addField(`Time of Day`, `${Sea.time}`, true)
    .addField(`Location`, `${Sea.location}`, true)
    .addField(`Available (Northern Hemisphere)`, `${Sea.nh}`, false)
    .addField(`Available (Southern Hemisphere)`, `${Sea.sh}`, false)
    .setThumbnail(Sea.image)
    .setFooter(`Info from Fandom WIKI | ${client.prefix}invite to add Blathers to your server`, null)
    .setColor(client.getRandomColor());
  return message.channel.send(embed);

};

module.exports.conf = {
  enabled: true,
  aliases: ['f'],
  permLevel: 'User',
  cooldown: 10
};

module.exports.help = {
  name: 'sea',
  category: 'misc',
  description: 'Lookup a certain sea creature from the Museum',
  usage: 'sea <name>',
  details: '<name> => The name of the sea creature required to lookup.'
};