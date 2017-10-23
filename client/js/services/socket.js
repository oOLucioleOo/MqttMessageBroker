'use strict';
angular.module('app').factory('socket', function(){
    //Creating connection with server
    var socket = io.connect('http://localhost:3000');

  return {
      onClientListUpdated : function(callback){
        socket.on('Client', callback);
      }
  };

});