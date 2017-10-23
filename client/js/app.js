// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
.module('app', [
  'lbServices',
  'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
    $urlRouterProvider) {
  $stateProvider
    .state('clients', {
      url: '',
      templateUrl: 'views/clients.html',
      controller: 'ClientsController',
      controllerAs : 'ctrl'
    });

  $urlRouterProvider.otherwise('client');
}]);