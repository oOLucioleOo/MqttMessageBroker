'use strict'

module.exports = {
    notify : function(io, modelName){
        io.emit(modelName, "la table "+ modelName + " à été modifié");
    }
}