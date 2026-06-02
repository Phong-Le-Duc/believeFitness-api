var { Sequelize } = require("sequelize");
var { dirname } = require("path");
var { existsSync, mkdirSync } = require("fs");

var fallbackStorage = "./storage/database.sqlite3";

function resolveStoragePath() {
	var configuredStorage = process.env.SQLITE_STORAGE || fallbackStorage;
	var storageDir = dirname(configuredStorage);

	try {
		if (!existsSync(storageDir)) {
			mkdirSync(storageDir, { recursive: true });
		}
		return configuredStorage;
	} catch (error) {
		var fallbackDir = dirname(fallbackStorage);
		if (!existsSync(fallbackDir)) {
			mkdirSync(fallbackDir, { recursive: true });
		}

		console.warn(
			`Could not access SQLITE_STORAGE at ${configuredStorage}. Falling back to ${fallbackStorage}.`,
			error.message
		);

		return fallbackStorage;
	}
}

var storage = resolveStoragePath();

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
