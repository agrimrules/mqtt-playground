var mqtt = require('mqtt');

client = mqtt.connect('mqtt://localhost');

client.on('connect', function() {
client.subscribe('presence');
client.publish('presence', 'Client 1 is alive.. Test Ping! ' + Date());
console.log('Client publishing.. ');
});

client.on('message', function (topic, message) {
    console.log(message.toString());
    client.end();
});

// client.end();
