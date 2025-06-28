module.exports.errorHandler = (err, req, res, next) => {
    if (res.headersSent){
        return;
    };

    const status = err.ststus || 500;
    const message = err.message || 'Server Error!';
};