

export default (constructorFunction) => (req, res, next) => {
    // 
    Promise.resolve(constructorFunction(req, res, next)).catch(next);
}