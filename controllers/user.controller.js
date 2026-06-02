var { User, Class } = require("../models/models");
var { hash } = require("bcryptjs");

var PASSWORD_SALT_ROUNDS = 10;

async function getSingleUser(req, res, next) {
	try {
		let user = await User.findByPk(parseInt(req.params.id), { include: [Class] });
		user.getClasses();
		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}

async function createSingleUser(req, res, next) {
	try {
		let password = await hash(req.fields.password, PASSWORD_SALT_ROUNDS);
		let user = await User.create({
			username: req.fields.username,
			userFirstName: req.fields.userFirstName,
			password,
			role: "default"
		});
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function addToClass(req, res, next) {
	try {
		let classInstance = await Class.findByPk(req.params.classId);
		classInstance.addUser(req.params.id);
		res.json(classInstance);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function removeFromClass(req, res, next) {
	try {
		let classInstance = await Class.findByPk(req.params.classId);
		classInstance.removeUser(req.params.id);
		res.end();
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createSingleUser,
	getSingleUser,
	addToClass,
	removeFromClass
};
