// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
.module('app')
.controller('ClientsController', ['$scope', '$state', 'Client','socket', function($scope,
    $state, Client, socket) {
  this.clients = [];
  var that = this;
  this.getClients = function() {
    Client
      .find()
      .$promise
      .then(function(results) {
        that.clients = results;
      });
  }
  this.getClients();
  socket.onClientListUpdated(function(){
    that.getClients();
  });
}]);