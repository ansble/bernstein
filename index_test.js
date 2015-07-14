import chai from 'chai';
import * as stack from './index';

let assert = chai.assert;

describe('Stack tests', () => {

    it('should be properly defined as an object', () => {
        assert.isObject(stack);
        assert.isFunction(stack.create);
    });

    it('shoult return a function when create is called', () => {
        let funcArr = [(data, original, next)=>{
                data.num ++;
                next(data);
            }
            , (data, original, next) => {
                data.num ++;
                next(data);
            }
            , (data, original) => {
                return new Promise(function (res, rej){
                    data.num ++;
                    res(data);
                });
            }];

        assert.isFunction(stack.create(funcArr));
    });

    it('should execute each of an array of functions in order', (done) => {
        let funcArr = [(data, original, next)=>{
                data.num ++;
                next(data);
            }
            , (data, original, next) => {
                data.num ++;
                next(data);
            }
            , (data, original) => {
                return new Promise(function (res, rej){
                    data.num ++;
                    res(data);
                });
            }]

            , run = stack.create(funcArr);

        run({num: 1}).then(function (data){
            assert.isTrue(data.num === 4);
            done();
        });
    });

    it('should pass through if no functions', (done) => {
        let funcArr

            , run = stack.create(funcArr);

        run({num: 1}).then(function (data){
            assert.isTrue(data.num === 1);
            done();
        });
    });
});
