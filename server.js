var mosca = require('mosca');
var creds = require('./private-config.json');
var dbsubsettings = {
    type: 'mongo',
    url: creds.mongo_url,
    pubsubCollection: 'mqtt',
    mongo: {}
};

var config = {
    port: 1883,
    backend: dbsubsettings
};

var server = new mosca.Server(config, function() {
    console.log('MQTT server is up and running')
});

//when a  client is connected
server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

//when the client subscribes to a topic
server.on('published', function(packet, client, cb) {
if (packet.topic.indexOf('echo') === 0) {
        return cb;
}
    console.log('subscribed : ', packet.topic);
    var newPacket = {
        topic: 'echo/' + packet.topic,
        payload: packet.payload,
        retain: packet.retain,
        qos: packet.qos
};
console.log('newPacket', newPacket);
server.publish(newPacket, cb);
});