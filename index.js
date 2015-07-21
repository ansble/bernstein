let create = (functions) => {
        functions = Array.isArray(functions) ? functions : [];
        return (data) => {
            return functions.reduce((prev, curr) => {
                return prev.then((request) => {
                    return new Promise((resolve, reject) => {
                        resolve(curr.apply(null, [request, data, resolve]));
                    });
                });
            //immediate promise to start the stack off right
            }, Promise.resolve(JSON.parse(JSON.stringify(data))));
        };
    };

export default {create};
