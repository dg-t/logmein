// Next will send to global error handle fn
module.exports = (fn) => (req, res, next) => fn(req, res, next).catch(next);
