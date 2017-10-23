'use strict';
var disableAllMethods = require('../helpers/LoopBackMethodsHelper.js').disableAllMethods;
var webSocketNotifications = require('../webSocketNotifications.js');
module.exports = function(Message) {
    disableAllMethods(Message);
    
    Message.observe('after save', function (ctx, next) {
        var socket = Message.app.io;
        webSocketNotifications.notify(socket, "Message")
        //Calling the next middleware..
        next();
    }); //after save..
    
};
