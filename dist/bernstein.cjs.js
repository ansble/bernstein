"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var create = function create(functions) {
    functions = Array.isArray(functions) ? functions : [];
    return function (data) {
        return functions.reduce(function (prev, curr) {
            return prev.then(function (request) {
                return new Promise(function (resolve, reject) {
                    resolve(curr.apply(null, [request, data, resolve]));
                });
            });
            //immediate promise to start the stack off right
        }, Promise.resolve(JSON.parse(JSON.stringify(data))));
    };
};

exports["default"] = { create: create };
module.exports = exports["default"];