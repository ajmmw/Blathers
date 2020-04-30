module.exports = (client, oldState, newState) => {
	const player = client.music.players.get(oldState.guild.id);
	let newuserchannel = newState.channel;
	let olduserchannel = oldState.channel;

	if (oldState.member.user.bot) return;
	if (newState.member.user.bot) return;
	if (!player) return;

	if (newuserchannel !== olduserchannel) {
		if (newuserchannel == null) {
			if (olduserchannel.id !== player.voiceChannel.id) return console.log('differeent channels');

			let number = olduserchannel.members.size;
			if (number == 1) {
				setTimeout(() => {
					if (olduserchannel.members.size == number) {
						//tested
						return client.music.players.destroy(player.guild.id); //nothing else added, let's dip
					} else {
						//tested
						if (olduserchannel.members.size > 1) return;
						else return client.music.players.destroy(player.guild.id);
					}
				}, 180000); //3 minutes
			} else {
				//disgusting
				let coll = olduserchannel.members.filter((member) => member.user.bot == true);
				if (coll.size == olduserchannel.members.size) {
					setTimeout(() => {
						let newcoll = olduserchannel.members.filter((member) => member.user.bot == true);
						if (newcoll.size == olduserchannel.members.size)
							return client.music.players.destroy(player.guild.id);
					}, 180000); //3 minutes
				}
			}
		}
	}
};
