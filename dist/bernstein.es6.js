export default function create(fns) {
    fns = Array.isArray(fns) ? fns : [];
                    //daisy chain the functions on the Promise with `then`s
    return (data) => fns.reduce(
        (prev, curr) => prev.then(
            (dataIn) => Promise.resolve(curr.apply(null, [dataIn, resolve]))
        ), Promise.resolve(data));
}
