const config = require("./config.json");
const Discord = require("discord.js");
const chalk = require('chalk');
const gamedig = require("gamedig");

const client = new Discord.Client();

client.config = config;

var nb = 1000

const updateChannel = async () => {

		const channel = client.channels.cache.get(config.playerCountChannelID);
		if(!channel) throw new Error("La salon spécifié dans la configuration n'existe pas !");
		
	    const stats = await gamedig.query({
	        type: "garrysmod",
	        host: config.playerCountServerIP,
	        port: config.playerCountServerPort
		});
		
	    if (stats.raw.numplayers != nb) {
	    	channel.setName(`Joueurs : ${stats.raw.numplayers}`);
	    }
};

client.on("ready", () => {

	console.log(chalk.green("[BOT] Connected to Discord."));
	
	updateChannel();
	setInterval(updateChannel, 60000*0.05);
	
});

client.login(config.token);
