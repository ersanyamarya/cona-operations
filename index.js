var influxConnections = {};
const mqttClient = require('./mqttSetup').mqttClient;
const influxSetup = require('./influx-setup');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));

mqttClient.on('message', function(topic, message) {
	const node = topic.split('/')[1];
	const con = `con${node}`;
	const msg = JSON.parse(message.toString());
	console.log(node, con, msg);

	if (!influxConnections[con])
		influxConnections[con] = influxSetup.getDbClient(node);
	influxConnections[con]
		.write(node)
		.tag({
			source: msg.source,
		})
		.field(msg.data)
		.then(() => console.info('write point success'))
		.catch(console.error);
});
