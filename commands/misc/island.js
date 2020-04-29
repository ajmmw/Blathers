exports.run = (client, message, args) => {
  switch (args[0]) {
    // Set Character Name
    case 'character':
    case 'char':
      User = client.getIsland.get(message.author.id);
      if (args.length === 1) {
        return client.error(message.channel, 'No Character Name Given', `<@${message.author.id}> Please supply your Characters Name.`);
      }
      if (!User) { User = { id: message.author.id, character: null, name: null, fruit: null, hemisphere: null } }
      char = args.slice(1).join(' ');
      User.character = char;
      client.setIsland.run(User);
      return client.success(message.channel, 'Character Name Added', `<@${message.author.id}> I've successfully added your characters name to your Island Information.`);

    // Set Island Name
    case 'name':
      User = client.getIsland.get(message.author.id);
      if (args.length === 1) {
        return client.error(message.channel, 'No Island Name Given', `<@${message.author.id}> Please supply your Island Name.`);
      }
      if (!User) { User = { id: message.author.id, character: null, name: null, fruit: null, hemisphere: null } }
      name = args.slice(1).join(' ');
      User.name = name;
      client.setIsland.run(User);
      return client.success(message.channel, 'Island Name Added', `<@${message.author.id}> I've successfully added your islands name to your Island Information.`);

    // Set Island Fruit
    case 'fruit':
      User = client.getIsland.get(message.author.id);
      if (args.length === 1) {
        return client.error(message.channel, 'No Fruit Given', `<@${message.author.id}> Please supply your Island Fruit.`);
      }
      switch (args[1]) {
        case 'apple':
        case 'cherry':
        case 'orange':
        case 'peach':
        case 'pear':
          if (!User) { User = { id: message.author.id, character: null, name: null, fruit: null, hemisphere: null } }
          fruit = args.slice(1).join(' ');
          User.fruit = fruit.toProperCase();
          client.setIsland.run(User);
          return client.success(message.channel, 'Fruit Added', `<@${message.author.id}> I've successfully added your island fruit to your Island Information.`);
        default:
          return client.error(message.channel, 'Not Valid Fruit', `<@${message.author.id}> Please provide either \`apple | cherry | orange | peach |pear\``);
      }

    // Set Island Location
    case 'location':
    case 'loc':
      switch (args[1]) {
        case 'northern':
          User = client.getIsland.get(message.author.id);
          if (args.length === 1) {
            return client.error(message.channel, 'No Location Given', `<@${message.author.id}> Please supply your Islands Location.`);
          }
          if (!User) { User = { id: message.author.id, character: null, name: null, fruit: null, hemisphere: null } }
          loc = args.slice(1).join(' ');
          User.hemisphere = loc.toProperCase();
          client.setIsland.run(User);
          return client.success(message.channel, 'Fruit Added', `<@${message.author.id}> I've successfully added your island fruit to your Island Information.`);
        case 'southern':
          User = client.getIsland.get(message.author.id);
          if (args.length === 1) {
            return client.error(message.channel, 'No Location Given', `<@${message.author.id}> Please supply your Islands Location.`);
          }
          if (!User) { User = { id: message.author.id, character: '', name: '', fruit: '', hemisphere: '' } }
          loc = args.slice(1).join(' ');
          User.hemisphere = loc.toProperCase();
          client.setIsland.run(User);
          return client.success(message.channel, 'Fruit Added', `<@${message.author.id}> I've successfully added your island fruit to your Island Information.`);
        default:
          return client.error(message.channel, 'Not Valid Location', `<@${message.author.id}> Please provide either \`northern\` or \`southern\``);
      }

    // Remove Island
    case 'del':
    case 'delete':
    case 'remove':
      User = client.getIsland.get(message.author.id);
      if (User) {
        UserSQL.prepare("DELETE FROM islands WHERE id = ?;").run(message.author.id);
        return client.success(message.channel, 'Successfully Deleted!', `<@${message.author.id}> I've successfully deleted your island information! You can set it again by typing \`;is <character|name|fruit|location> <value>\`!`);
      }
      return client.error(message.channel, 'No Island To Remove!', `<@${message.author.id}> You did not have a island in the database. You can set it by typing \`;is <character|name|fruit|location> <value>\`!`);

    // Display User Friendcode
    default:
      if (args.length === 0) {
        UserFC = client.getFC.get(message.author.id);
        UserIS = client.getIsland.get(message.author.id);
        if (!UserIS) {
          return client.error(message.channel, 'No Island Found!', `<@${message.author.id}> You have not set up your island! You can do so by running \`;is <character|name|fruit|location> <value>\`!`);
        }
        output = '';
        if (UserFC) { output += `Friend Code: **${UserFC.code}**\n` };
        if (UserIS.character != null) { output += `Characters Name: **${UserIS.character}**\n` };
        if (UserIS.name != null) { output += `Island Name: **${UserIS.name}**\n` };
        if (UserIS.fruit != null) { output += `Fruit: **${UserIS.fruit}**\n` };
        if (UserIS.hemisphere != null) { output += `Hemisphere: **${UserIS.hemisphere}**` };
        embed = new Discord.MessageEmbed()
          .setAuthor(`${message.member.displayName}'s Island`, message.author.displayAvatarURL())
          .setColor('#e4000f')
          .setDescription(output);
        if (UserIS.hemisphere != null) { embed.setThumbnail(`https://pnkllr.net/projects/Blathers/${UserIS.hemisphere}.png`) };
        return message.channel.send(embed);
      }

      // See Tagged Users Friendcode
      member = message.mentions.members.first();
      if (member) {
        UserFC = client.getFC.get(message.mentions.members.first().id);
        UserIS = client.getIsland.get(message.mentions.members.first().id);
        if (!UserIS) {
          return client.error(message.channel, 'No Island Found!', `${member.displayName} has not set their island!`);
        }
        output = '';
        if (UserFC) { output += `Friend Code: **${UserFC.code}**\n` };
        if (UserIS.character != null) { output += `Characters Name: **${UserIS.character}**\n` };
        if (UserIS.name != null) { output += `Island Name: **${UserIS.name}**\n` };
        if (UserIS.fruit != null) { output += `Fruit: **${UserIS.fruit}**\n` };
        if (UserIS.hemisphere != null) { output += `Hemisphere: **${UserIS.hemisphere}**` };
        embed = new Discord.MessageEmbed()
          .setAuthor(`${member.displayName}'s Island`, member.user.displayAvatarURL())
          .setColor('#e4000f')
          .setDescription(output)
        if (UserIS.hemisphere != null) { embed.setThumbnail(`https://pnkllr.net/projects/Blathers/${UserIS.hemisphere}.png`) };
        return message.channel.send(embed);
      }
      return client.error(message.channel, 'Unknown Member!', `Could not find a member by that name!`);
  }

};

module.exports.conf = {
  enabled: true,
  aliases: ['is'],
  permLevel: 'User',
  cooldown: 10
};

module.exports.help = {
  name: 'island',
  category: 'misc',
  description: 'Displays your Island Information',
  usage: 'island <character|name|fruit|location> <value>',
  details: "<character|name|fruit|location> => Update the information of the seclected area."
};