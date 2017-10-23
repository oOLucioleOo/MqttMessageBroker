'use strict';
var disableAllMethods = require('../helpers/LoopBackMethodsHelper.js').disableAllMethods;
var app = require('../../server/server');

module.exports = function(Topic) {
    disableAllMethods(Topic, ["find"]);

    Topic.publish = function(topic, payload , cb) {
        Topic.findOrCreate({where: {name: topic}}, {name: topic},
            (err, instance, created) => {
              if(!err){
                app.models.message.create({text: payload, idTopic: instance.__data.id},
                (err) => {
                  if(err) console.log(err);
                  else cb(null, 'published... ' + topic + " =>  " +payload);
                });
              }
            });
        
    }
  
    Topic.remoteMethod('publish', {
            accepts: [{arg: 'topic', type: 'string'}, {arg: 'payload', type: 'string'}],
            returns: {arg: 'status', type: 'string'}
      });
};
