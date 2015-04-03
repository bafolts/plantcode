
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {
    return (function () {

        var Field = function (accessType, returnType, fieldName) {
            this.sAccessType = accessType;
            this.sReturnType = returnType;
            this.sFieldName = fieldName;
        }

        Field.prototype.getAccessType = function () {
            return this.sAccessType;
        }

        Field.prototype.getReturnType = function () {
            return this.sReturnType;
        }
        
        Field.prototype.getName = function () {
            return this.sFieldName;
        }

        return Field;

        })()

});
