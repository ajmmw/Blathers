exports.run = (client, message, args) => {
    switch (args[0]) {
        // Set Friendcode
        case 'set':
        case 'add':
            User = client.getFC.get(message.author.id);
            if (args.length === 1) {
                embed = new Discord.MessageEmbed()
                    .setDescription(`**No Code Given**\n<@${message.author.id}> Please supply your Switch Friend Code.`)
                    .setColor(0xFF0000);
                return message.channel.send(embed);
            }
            code = args.slice(1).join().replace(/[\D]/g, '');
            if (code.length !== 12) {
                embed = new Discord.MessageEmbed()
                    .setDescription(`**Invalid Code!**\n<@${message.author.id}> The code must have 12 digits!`)
                    .setColor(0xFF0000);
                return message.channel.send(embed);
            }
            if (!User) { User = { id: message.author.id, name: message.member.username, code: `` } }
            User.code = `SW-${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}`;
            User.name = message.member.displayName;
            client.setFC.run(User);

            embed = new Discord.MessageEmbed()
                .setAuthor(`${message.member.displayName}'s Friend Code`, message.author.displayAvatarURL())
                .setTitle('Successfully set your friend code!')
                .setColor('#e4000f')
                .setDescription(`**<:switch:700955215859417190> ${User.code}**`);
            return message.channel.send(embed);

        // Remove Friendcode
        case 'del':
        case 'delete':
        case 'remove':
            User = client.getFC.get(message.author.id);
            if (User) {
                UserSQL.prepare("DELETE FROM friendcode WHERE id = ?;").run(message.author.id);
                embed = new Discord.MessageEmbed()
                    .setColor(0x32CD32)
                    .setDescription(`**Successfully Deleted!**\n<@${message.author.id}> I've successfully deleted your friend code! You can set it again by typing \`;fc set <code>\`!`)
                return message.channel.send(embed);
            }
            embed = new Discord.MessageEmbed()
                .setDescription(`**No Friend Code To Remove!**\n<@${message.author.id}> You did not have a friend code in the database. You can set it by typing \`;fc set <code>\`!`)
                .setColor(0xFF0000);
            return message.channel.send(embed);

        // Display User Friendcode
        default:
            if (args.length === 0) {
                User = client.getFC.get(message.author.id);
                if (!User) {
                    embed = new Discord.MessageEmbed()
                        .setDescription(`**No Code Found!**\n<@${message.author.id}> You have not set a friend code! You can do so by running \`;fc set <code>\`!`)
                        .setColor(0xFF0000);
                    return message.channel.send(embed);
                }
                embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName}'s Friend Code`, message.author.displayAvatarURL())
                    .setColor('#e4000f')
                    .setDescription(`**<:switch:700955215859417190> ${User.code}**`);

                return message.channel.send(embed);
            }

            // See Tagged Users Friendcode
            member = message.mentions.members.first();
            if (member) {
                User = client.getFC.get(message.mentions.members.first().id);
                if (!User) {
                    embed = new Discord.MessageEmbed()
                        .setDescription(`**No Code Found!**\n${member.displayName} has not set their friend code!`)
                        .setColor(0xFF0000);
                    return message.channel.send(embed);
                }
                embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.displayName}'s Friend Code`, member.user.displayAvatarURL())
                    .setColor('#e4000f')
                    .setDescription(`**<:switch:700955215859417190> ${User.code}**`);

                return message.channel.send(embed);
            }

            embed = new Discord.MessageEmbed()
                .setDescription(`**Unknown Member!**\nCould not find a member by that name!`)
                .setColor(0xFF0000);
            return message.channel.send(embed);
    }

};

module.exports.help = {
    name: 'friendcode',
    category: 'misc',
    description: 'Displays your Nintendo Switch Friend Code',
    usage: ';friendcode <set|delete> <code|@member>',
    aliases: ['fc'],
};