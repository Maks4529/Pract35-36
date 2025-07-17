const { ValidationError } = require("sequelize");

module.exports.dbErrorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError){
        const errors = err.errors.map(e => ({status: 422, title: e.message}));
        return res.status(422).send(errors);
    };
    
    if (err instanceof BaseError){
        res.status(500).send([{
            status: 500,
            title: 'Base Error!',
        },
    ]);
    };

    next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
    if (res.headersSent){
        return;
    };

    const status = err.ststus || 500;
    const message = err.message || 'Server Error!';
};