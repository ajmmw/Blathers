exports.run = (client, message, args) => {
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '0x';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    let [table, item1, item2, item3] = args;
    if (!table || !item1) return;
    if (item3) {
        value = `${item1} ${item2} ${item3}`
    } else if (item2) {
        value = `${item1} ${item2}`;
    } else
        value = `${item1}`;

    // Fish Lookup
    if (table == 'fish') {
        Fish = client.getFish.get(value);
        if (!Fish) {
            embed = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> there is no such Fish in our Museum right now.`)
                .setColor(0xFF0000);
            return message.channel.send(embed).catch(() => { return });
        } else
            embed = new Discord.MessageEmbed()
                .setAuthor(`${Fish.name}`, null)
                .setDescription(`\`\`\`${Fish.quote}\`\`\``)
                .addField(`Price`, `${Fish.price} <:bells:698107158805348373>`, true)
                .addField(`Shadow Size`, `${Fish.size}`, true)
                .addField(`Time of Day`, `${Fish.time}`, true)
                .addField(`Location`, `${Fish.location}`, true)
                .addField(`Avalible (Northern Hemisphere)`, `${Fish.nh}`, false)
                .addField(`Avalible (Southern Hemisphere)`, `${Fish.sh}`, false)
                .setThumbnail(Fish.image)
                .setColor(getRandomColor());
        return message.channel.send(embed).catch(error => { console.error('LOOKUP COMMANMD', error); });
    }

    // Bug Lookup
    if (table == 'bug') {
        Bug = client.getBug.get(value);
        if (!Bug) {
            embed = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> there is no such bug in our Museum right now.`)
                .setColor(0xFF0000);
            return message.channel.send(embed).catch(() => { return });
        } else
            embed = new Discord.MessageEmbed()
                .setAuthor(`${Bug.name}`, null)
                .setDescription(`\`\`\`${Bug.quote}\`\`\``)
                .addField(`Price`, `${Bug.price} <:bells:698107158805348373>`, true)
                .addField(`Time of Day`, `${Bug.time}`, true)
                .addField(`Location`, `${Bug.location}`, true)
                .addField(`Avalible (Northern Hemisphere)`, `${Bug.nh}`, false)
                .addField(`Avalible (Southern Hemisphere)`, `${Bug.sh}`, false)
                .setThumbnail(Bug.image)
                .setColor(getRandomColor());
        return message.channel.send(embed).catch(error => { console.error('LOOKUP COMMANMD', error); });
    }
}