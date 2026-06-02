var { Sequelize } = require("sequelize");
var { dirname } = require("path");
var { mkdirSync } = require("fs");

var storage = process.env.SQLITE_STORAGE || "./storage/database.sqlite3";
mkdirSync(dirname(storage), { recursive: true });

var sequelize = new Sequelize({
	dialect: "sqlite",
	storage,
	logging: false
});

async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log("Connection established");
	} catch (error) {
		console.error("Unable to connect", error);
	}
}

module.exports = {
	testConnection,
	sequelize
};
