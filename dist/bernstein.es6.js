let create = (functions) => {
        return (data) => {

            return functions.reduce((prev, curr) => {
                return prev.then((request) => {
                    return new Promise((resolve, reject) => {
                        var p = curr.apply(null, [request, data, resolve]);

                        if(p instanceof Promise){
                            p.then((resp) => {
                                resolve(resp);
                            });
                        }
                    });
                });

            }, new Promise((res, rej) => {
                //immediate promise to start the stack off right
                res(JSON.parse(JSON.stringify(data)));
            }));
        };
    };

export default {create};
