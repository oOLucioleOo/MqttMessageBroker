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
    app.models.client.destroyAll({objectId :client.id});
    
    console.log('Client Disconnected:', client.id);
  });
  // fired when a message is received
  server.on('published', function(packet, client) {
    if (client){
      getPersistedTopic(packet.topic).then(
        (topic) => {
          return addMessageToTopic(packet.payload, topic.id);
        }
      );
    }
  });
  
  // fired when the mqtt server is ready
  function setup() {
    console.log('Mosca server is up and running')
  }

  function getPersistedTopic (name){
    return app.models.topic.findOrCreate({where: {name: name}}, {name:name}).then(
      (res) => {
        var instance = res[0], created = res [1];
        if(created) console.log("new Topic created ", instance.__data);
        return instance.__data;
      }
    );
  }

  function addMessageToTopic(msg, topicId){
    return app.models.message.create({text: msg, idTopic: topicId}).then(
      res => {
        console.log("new message created ", res.__data);
        return res.__data;
      }
    );
  }
};
