'use strict';

module.exports = function(app) {

  var mosca = require('mosca')
  var moscaSettings = {
    port: 1883
  };
  
  var server = new mosca.Server(moscaSettings);
  server.on('ready', setup);
  
  server.on('clientConnected', function(client) {
    app.models.client.create({objectId :client.id});
    
    console.log('client connected', client.id);		
  });
  // fired when a client disconnects
  server.on('clientDisconnected', function(client) {
    // app.models.client.destroyAll({objectId :client.id});
    
    console.log('Client Disconnected:', client.id);
  });
  // fired when a message is received
  server.on('published', function(packet, client) {
    console.log('packet', packet);
    if (client){
      var isConnected = app.models.client.find({where: {objectId: client.id}},
        (err, results) => {
          if(!err && results){
            console.log('results', results);
            app.models.topic.findOrCreate({where: {name: packet.topic}}, {name: packet.topic},
            (err, instance, created) => {
              if(!err){
                app.models.message.create({text: packet.payload, idTopic: instance.__data.id},
                (err) => {
                  if(err) console.log(err);
                });
              }
            });
          }
        }
      );
    }
    
    console.log('Published', packet.payload);
  });
  
  // fired when the mqtt server is ready
  function setup() {
    console.log('Mosca server is up and running')
  }
};
