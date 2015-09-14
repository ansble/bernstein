# bernstein
execute an arbitrary number of arbitrary functions in sequence over the same data in javascript

## Wat?!
bernstein let's you execute an array of functions (synchonrous and async) over a data set. Each function recieves the output of the previous function as it's primary input. And so on...

##Use
Check out the tests for detailed use...

To install you can use: `bower install bernstein --save` or for server side use: `npm install bernstein --save`

To create an execution stack you pass `bernstein.create` an array of functions. It then returns a function that can pass data to for execution. The returned function returns a promise that allows you to collect the finished data when all functions have been executed.

For example:
```
var funcArr = [
        function (data, next) {
            data.num ++;
            next(data);
        }
        , function (data, next) {
            data.num ++;
            next(data);
        }
        , function (data) {
            return new Promise(function (res, rej){
                data.num ++;
                res(data);
            });
        }
    ]

    , run = bernstein.create(funcArr);

run({num: 10}).then(function (finalData) {
    console.log(finalData); 
});

```

The functions in the array recieve three possible parameters:
- `data` the data of returned by the previous function
- `next` a function that moves the stack on to the next function. Pass next the data you want to pass on. Alternately your function can return a promise and the data that the promise resolves with will be passed onto the next function in the stack. This allows for async operations (file reads, network requests, etc.) to easily be included as part of the execution stack.
