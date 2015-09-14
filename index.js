export default function create(fns) {
    fns = Array.isArray(fns) ? fns : [];
                    //daisy chain the functions on the Promise with `then`s
    return (data) => fns.reduce(
        (prev, curr) => prev.then(
            (dataIn) => new Promise((resolve, reject) => resolve(curr(dataIn, resolve)))
        ), Promise.resolve(data));
}
