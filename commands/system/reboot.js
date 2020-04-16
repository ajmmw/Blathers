module.exports.run = async (client, message, args) => {
    if (message.author.id != client.config.ownerID) return;
    await message.channel.send('Rebooting bot! Please allow at least 10 seconds for the bot to fully reboot!');
    console.log('Bot rebooting...');
    process.exit(0);
};

module.exports.help = {
    name: 'reboot',
    category: 'system',
    description: 'Reboots the bot',
    usage: ';reboot',
    aliases: [],
};