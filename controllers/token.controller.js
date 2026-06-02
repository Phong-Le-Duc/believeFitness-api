var { User } = require("../models/models");
var { compare, hash } = require("bcryptjs");
var { sign } = require("jsonwebtoken");

var PASSWORD_SALT_ROUNDS = 10;

function getHashRounds(passwordHash) {
	let parts = passwordHash.split("$");
	return parseInt(parts[2], 10);
}

async function createToken(req, res, next) {
	try {
		let user = await User.findOne({ where: { username: req.fields.username } });

		if (!user) return res.status(401).end();

		if (!await compare(req.fields.password, user.password))
			return res.status(401).end();

		if (getHashRounds(user.password) > PASSWORD_SALT_ROUNDS) {
			let updatedPassword = await hash(req.fields.password, PASSWORD_SALT_ROUNDS);
			await user.update({ password: updatedPassword });
		}

		let token = sign({
			data: user
		}, process.env.JWT_SECRET, { expiresIn: "1h" });

		res.json({
			userId: user.id,
			token,
			role: user.role,
			validUntil: Date.now() + (60 * 60 * 1000)
		});
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createToken
};
