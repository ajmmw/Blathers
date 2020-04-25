exports.run = (client, message, args) => {
  switch (args[0]) {
    // Set Friendcode
    case 'set':
    case 'add':
      User = client.getFC.get(message.author.id);
      if (args.length === 1) {
        return client.error(message.channel, 'No Code Given', `<@${message.author.id}> Please supply your Switch Friend Code.`);
      }
      code = args.slice(1).join().replace(/[\D]/g, '');
      if (code.length !== 12) {
        return client.error(message.channel, 'Invalid Code!', `<@${message.author.id}> The code must have 12 digits!`);
      }
      if (!User) { User = { id: message.author.id, name: message.member.username, code: `` } }
      User.code = `SW-${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}`;
      User.name = message.member.displayName;
      client.setFC.run(User);

      embed = new Discord.MessageEmbed()
        .setAuthor(`${message.member.displayName}'s Friend Code`, message.author.displayAvatarURL())
        .setTitle('Successfully set your friend code!')
        .setColor('#e4000f')
        .setDescription(`**${User.code}**`);
      return message.channel.send(embed);

    // Remove Friendcode
    case 'del':
    case 'delete':
    case 'remove':
      User = client.getFC.get(message.author.id);
      if (User) {
        UserSQL.prepare("DELETE FROM friendcode WHERE id = ?;").run(message.author.id);
        return client.success(message.channel, 'Successfully Deleted!', `<@${message.author.id}> I've successfully deleted your friend code! You can set it again by typing \`;fc set <code>\`!`);
      }
      return client.error(message.channel, 'No Friend Code To Remove!', `<@${message.author.id}> You did not have a friend code in the database. You can set it by typing \`;fc set <code>\`!`);

    // Display User Friendcode
    default:
      if (args.length === 0) {
        User = client.getFC.get(message.author.id);
        if (!User) {
          return client.error(message.channel, 'No Code Found!', `<@${message.author.id}> You have not set a friend code! You can do so by running \`;fc set <code>\`!`);
        }
        embed = new Discord.MessageEmbed()
          .setAuthor(`${message.member.displayName}'s Friend Code`, message.author.displayAvatarURL())
          .setColor('#e4000f')
          .setDescription(`**${User.code}**`);
        return message.channel.send(embed);
      }

      // See Tagged Users Friendcode
      member = message.mentions.members.first();
      if (member) {
        User = client.getFC.get(message.mentions.members.first().id);
        if (!User) {
          return client.error(message.channel, 'No Code Found!', `${member.displayName} has not set their friend code!`);
        }
        embed = new Discord.MessageEmbed()
          .setAuthor(`${member.displayName}'s Friend Code`, member.user.displayAvatarURL())
          .setColor('#e4000f')
          .setDescription(`**${User.code}**`);
        return message.channel.send(embed);
      }
      return client.error(message.channel, 'Unknown Member!', `Could not find a member by that name!`);
  }

};

module.exports.conf = {
  enabled: true,
  aliases: ['fc'],
  permLevel: 'User',
  cooldown: 10
};

module.exports.help = {
  name: 'friendcode',
  category: 'misc',
  description: 'Displays your Nintendo Switch Friend Code',
  usage: 'friendcode <set|delete> <code|@user>',
  details: "<set|del> => Whether to set a new friend code or delete an existing one.\n<code|@member> => Only necessary if you're setting a new code or getting the code of another member."
};