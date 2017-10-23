// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
.module('app')
.controller('ClientsController', ['$scope', '$state', 'Client','Topic','socket', function($scope,
    $state, Client,Topic, socket) {
  this.clients = [];
  this.currentTopic = 0;
  this.listTopics = [];
  this.messages = [];
  var that = this;
  this.getClients = function() {
    return Client
      .find()
      .$promise
      .then(function(results) {
        that.clients = results;
      });
  };
  this.getTopics = function(){
    return Topic.find({filter :{include : "messages"}})
    .$promise
    .then(function(results) {
      that.listTopics = results;
    });
  };
  this.loadMessages = function(){
     var index =that.listTopics
    .findIndex(i => i.id === that.currentTopic);
    that.messages = that.listTopics[index]
      .messages;
  }
  this.getClients();
  this.getTopics();
  socket.onClientListUpdated(function(){
    that.getClients();
  });
  socket.onMessageListUpdated(function(){
    that.getTopics().then(res =>{
      that.loadMessages();
    });
  })
}]);