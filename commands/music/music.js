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
						if (player) {
							if (player.queue.length < 1) client.music.players.destroy(message.guild.id);
						}
						message.channel.send(`⚠ **Selection Timed Out**`);
						resolve(true);
					}
				});
			});
	});
}

exports.run = async (client, message, args) => {
	let scopedid = message.author.id; //for when we use the bot's message and need to access the original
	let scopedauthor = message.author;

	const voiceChannel = message.member.voice.channel;
	if (!voiceChannel) return client.warn(message.channel, 'Not In Voice Channel', `<@${message.author.id}> You need to be in a voice channel to use this command.`);

	const permissions = voiceChannel.permissionsFor(client.user);
	if (!permissions.has('CONNECT')) return client.warn(message.channel, 'Invalid Permission', `Unable to connect to that Voice Channel.`);
	if (!permissions.has('SPEAK')) return client.warn(message.channel, 'Invalid Permission', `Unable to speak in that Voice Channel.`);

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
	const new_horizons = 'https://www.youtube.com/playlist?list=PLtR9Q1fwfhSfRdExf8MhlmQZK1XctX-1I';
	const new_leaf = 'https://www.youtube.com/playlist?list=PLhHcMbVmbwCerhZdxVr4odQY_ZgLXEjET';
	const city_folk = 'https://www.youtube.com/playlist?list=PLH834K1pkcjI6DHKCawkF87zFx23TNh5T';
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

						var playing = new Discord.MessageEmbed()
							.setTitle('-● DJ Blathers ●-')
							.setDescription(`Playing the **Animal Crossing: ${type}** playlist with **${res.playlist.tracks.length}** total tracks.`)
							.setColor(client.getRandomColor());
						message.channel.send(playing);
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