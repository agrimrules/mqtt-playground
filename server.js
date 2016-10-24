var mosca = require('mosca');

var settings = {
    port: 1883,
    persistence: mosca.persistence.Memory
};

var server = new mosca.Server(settings, function() {
    console.log('MQTT server is up and running')
});

//when a  client is connected
server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

//when a message is received
server.on('published', function(packet, client) {
    console.log('Published : ', packet.payload);
});

//when the client subscribes to a topic
server.on('subscribed', function(packet, client, cb) {
    console.log('subscribed : ', topic);
    var newPacket = {
        topic: 'echo/' + packet.topic,
        payload: packet.payload,
        retain: packet.retain,
        qos: packet.qos
};
console.log('newPacket', newPacket);
server.publish(newPacket, cb);
});