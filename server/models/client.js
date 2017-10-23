'use strict';
var disableAllMethods = require('../helpers/LoopBackMethodsHelper.js').disableAllMethods;

module.exports = function(Client) {
    
    disableAllMethods(Client, ["find"]);
};
