var mqtt = require('mqtt');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));
var mqttClient = mqtt.connect(config.mqtt.url);

mqttClient.on('connect', function() {
	console.log('connected to mqtt');

	Object.keys(config.database.nodes).forEach(node => {
		mqttClient.subscribe(`cona/${node}`);
	});
});

module.exports.mqttClient = mqttClient;
