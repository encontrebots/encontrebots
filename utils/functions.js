async function getStaff (req, bot, config) {
	let staff;
	try {
		if (!req.session.passport?.user.id) return;
		const guild = await bot.getRESTGuild(config.discord.guild.id);
		const member = await guild.getRESTMember(req.session.passport.user.id);
		if (member.roles.includes(config.discord.guild.roles.verifier)) {
			staff = true;
		}
		else {
			staff = false;
		}
		if (req.session.passport?.user.id) {
			req.session.passport.user.staff = staff;
		}
	}
	catch (e) {
		staff = false;
	}
}

module.exports = getStaff;