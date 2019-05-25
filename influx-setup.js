const Influx = require('influxdb-nodejs');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));

module.exports.getDbClient = node => {
	const influxDhtClient = new Influx(config.database.url);
	const cnode = config.database.nodes[node];

	const tagSchema = {
		source: '*',
	};
	influxDhtClient.schema(node, cnode.fieldSchema, tagSchema, {
		stripUnknown: true,
	});
	return influxDhtClient;
};
