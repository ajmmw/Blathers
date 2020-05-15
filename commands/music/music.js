async function _continue(msg, player) {
	//had to use promises with this so the code would wait for this to finish
	//this stuff was mind bending lmao
	return new Promise(function (resolve, reject) {
		let scopedid = msg.author.id;
		msg.channel
			.send(`⚠ **DJ Blathers Already Live**\nA playlist is already playing, would you like to change it?`)
			.then(async function (message) {
				await message.react('✅');
				message.react('❌');

				const filter = (reaction, user) =>
					(reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === scopedid;

				const collector = message.createReactionCollector(filter, { time: 15000, max: 1 });

				collector.on('collect', (r) => {
					if (r.emoji.name == '✅') {
						resolve(false);
					} else if (r.emoji.name == '❌') {
						message.channel.send(`<:cross:701739087400534016> **Selection Canceled**`);
						resolve(true);
					}
				});

				collector.on('end', (_, reason) => {
					if (['time', 'cancelled'].includes(reason)) {
						message.channel.send(`⚠ **Selection Timed Out**`);
						resolve(true);
					}
				});
			});
	});
}

exports.run = async (client, message, args) => {
	// Check If Custom Channel is Set and Isnt Deleted
	Settings = client.getSetting.get(message.guild.id);
	if (client.channels.cache.get(Settings.music_channel) && message.channel.id != Settings.music_channel) return client.warn(message.channel, 'WRONG CHANNEL', `<@${message.author.id}> Please use that command in ${client.channels.cache.get(Settings.music_channel)}.`);

	if (!message.channel.permissionsFor(message.guild.me).has(['ADD_REACTIONS'])) return client.error(message.channel, 'INVALID PERMISSIONS', `I currently don't have the \`Add Reactions\`permission. I need this for Playlist Selection.`);

	let scopedid = message.author.id; //for when we use the bot's message and need to access the original
	let scopedauthor = message.author;

	const voiceChannel = message.member.voice.channel;
	if (!voiceChannel) return client.warn(message.channel, 'NOT IN VOICE', `<@${message.author.id}> You need to be in a voice channel to use this command.`);

	const permissions = voiceChannel.permissionsFor(client.user);
	if (!permissions.has('CONNECT')) return client.warn(message.channel, 'INVALID PERMISSIONS', `Unable to connect to that Voice Channel.`);
	if (!permissions.has('SPEAK')) return client.warn(message.channel, 'INVALID PERMISSIONS', `Unable to speak in that Voice Channel.`);

	let vcheck = false;

	//check if bot is already playing
	let amiplaying = client.music.players.get(message.guild.id);
	if (amiplaying) {
		vcheck = await _continue(message, amiplaying);
	}

	//disgusting, sorry. it works.
	if (vcheck) return;
	else {
		if (amiplaying) {
			amiplaying.queue.splice(0, amiplaying.queue.length - 1);
			amiplaying.stop();
		}
	}

	//create our player
	const player = client.music.players.spawn({
		guild: message.guild,
		textChannel: message.channel,
		voiceChannel
	});

	//playlist links
	const new_horizons = 'https://www.youtube.com/playlist?list=PLEH-LfJOB3zX0ctzigFyHQZrGIP5mJJRe';
	const new_leaf = 'https://www.youtube.com/playlist?list=PLEH-LfJOB3zWGtwYOGLUZMe9e4aG7HZrH';
	const city_folk = 'https://www.youtube.com/playlist?list=PLEH-LfJOB3zWGeeXk12vi2d3hnVNbT9mC';
	const remixes = 'https://www.youtube.com/playlist?list=PLEH-LfJOB3zWu0UpLSiHetgYLsSpg_DDS';

	var selectionembed = new Discord.MessageEmbed()
		.setColor(client.getRandomColor())
		.setTitle('-● DJ Blathers ●-')
		.setDescription('React with the follow to play that particular playlist:\n☀️ - New Horizons Soundtrack\r\n🌿 - New Leaf Soundtrack\r\n🌆 - City Folk Soundtrack\r\n🌌 - Animal Crossing Remixes\r\n\n❌ - Cancel')
		.setFooter('Selection will end in 20 seconds.');
	message.channel.send(selectionembed).then(async function (message) {
		//wait for reactions
		await message.react('☀️');
		await message.react('🌿');
		await message.react('🌆');
		await message.react('🌌');
		message.react('❌');

		const filter = (reaction, user) =>
			//filter out other reactions or random user's reactions
			(reaction.emoji.name === '☀️' ||
				reaction.emoji.name === '🌿' ||
				reaction.emoji.name === '🌆' ||
				reaction.emoji.name === '🌌' ||
				reaction.emoji.name === '❌') &&
			user.id === scopedid;

		const collector = message.createReactionCollector(filter, { time: 20000, max: 1 });

		collector.on('collect', (r) => {
			//we found something!! :)
			let type = '';
			let playlist = '';
			//disgusting
			if (r.emoji.name == '☀️') {
				playlist = new_horizons;
				type = 'New Horizons';
			} else if (r.emoji.name == '🌿') {
				playlist = new_leaf;
				type = 'New Leaf';
			} else if (r.emoji.name == '🌆') {
				playlist = city_folk;
				type = 'City Folk';
			} else if (r.emoji.name == '🌌') {
				playlist = remixes;
				type = 'Remixes';
			} else if (r.emoji.name == '❌') {
				client.music.players.destroy(message.guild.id);
				return message.channel.send(`${client.emoji.error} **Selection Canceled**`);
			}

			client.music.search(playlist, scopedauthor).then(async (res) => {
				//load a playlist
				switch (res.loadType) {
					case 'PLAYLIST_LOADED':
						//add to queue
						res.playlist.tracks.forEach((track) => player.queue.add(track));
						message.channel.send(`▶️ **Playlist Selected**\nPlaying the \`Animal Crossing: ${type}\` playlist with \`${res.playlist.tracks.length}\` total tracks.`);
						//start player
						if (!player.playing) player.play();
						player.setVolume(10);
				}
			});
		});

		collector.on('end', (_, reason) => {
			//timed out :(
			if (['time', 'cancelled'].includes(reason)) {
				if (player.queue.length < 1) client.music.players.destroy(message.guild.id);
				return message.channel.send(`${client.emoji.warning} **Selection Timed Out**`);
			}
		});
	});
};

module.exports.conf = {
	enabled: true,
	aliases: ['play'],
	permLevel: 'User',
	cooldown: 10
};

module.exports.help = {
	name: 'music',
	category: 'music',
	description: "Play music from any Animal Crossing game's soundtrack",
	usage: 'music'
};