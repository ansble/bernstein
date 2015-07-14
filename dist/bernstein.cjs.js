"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var create = function create(functions) {
    return function (data) {

        return functions.reduce(function (prev, curr) {
            return prev.then(function (request) {
                return new Promise(function (resolve, reject) {
                    var p = curr.apply(null, [request, data, resolve]);

                    if (p instanceof Promise) {
                        p.then(function (resp) {
                            resolve(resp);
                        });
                    }
                });
            });
        }, new Promise(function (res, rej) {
            //immediate promise to start the stack off right
            res(JSON.parse(JSON.stringify(data)));
        }));
    };
};

exports["default"] = { create: create };
module.exports = exports["default"];