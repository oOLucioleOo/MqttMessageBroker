'use strict';
var disableAllMethods = require('../helpers/LoopBackMethodsHelper.js').disableAllMethods;
var webSocketNotifications = require('../webSocketNotifications.js');
module.exports = function(Client) {
    disableAllMethods(Client, ["find"]);

    Client.observe('after save', function (ctx, next) {
        var socket = Client.app.io;
        webSocketNotifications.notify(socket, "Client")
        //Calling the next middleware..
        next();
    }); //after save..
    
    Client.observe('after delete', function (ctx, next) {
        var socket = Client.app.io;
        webSocketNotifications.notify(socket, "Client")
        //Calling the next middleware..
        next();
    }); 
};
