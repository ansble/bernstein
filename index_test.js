import chai from 'chai';
import create from './index';

let assert = chai.assert;

describe('Stack tests', () => {

    it('should be properly defined as a function', () => {
        assert.isFunction(create);
    });

    it('should return a function when create is called', () => {
        let funcArr = [(data, next)=>{
                data.num++;
                next(data);
            }
            , (data, next) => {
                data.num++;
                next(data);
            }
            , (data) => {
                return new Promise(function (res, rej){
                    data.num++;
                    res(data);
                });
            }];

        assert.isFunction(create(funcArr));
    });

    it('should execute each of an array of functions in order', (done) => {
        let funcArr = [(data, next)=>{
                assert.strictEqual(data.num, 1);
                data.num ++;
                assert.strictEqual(data.num, 2);
                next(data);
            }
            , (data, next) => {
                data.num = data.num * 3;
                assert.strictEqual(data.num, 6);
                next(data);
            }
            , (data, next) => {
                return new Promise(function (res, rej){
                    data.num = data.num / 2;
                    assert.strictEqual(data.num, 3);
                    res(data);
                });
            }]

            , run = create(funcArr);

        run({num: 1}).then(function (data){
            assert.strictEqual(data.num, 3);
            done();
        }).catch(function (err){
            assert.isUndefined(err);
            done();
        });
    });

    it('should pass through if no functions', (done) => {
        let funcArr
            , run = create(funcArr);

        run({num: 1}).then(function (data){
            assert.isTrue(data.num === 1);
            done();
        });
    });
});
