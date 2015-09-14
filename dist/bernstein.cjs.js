"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = create;

function create(fns) {
    fns = Array.isArray(fns) ? fns : [];
    //daisy chain the functions on the Promise with `then`s
    return function (data) {
        return fns.reduce(function (prev, curr) {
            return prev.then(function (dataIn) {
                return new Promise(function (resolve, reject) {
                    return resolve(curr(dataIn, resolve));
                });
            });
        }, Promise.resolve(data));
    };
}

module.exports = exports["default"];