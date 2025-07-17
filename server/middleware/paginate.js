module.exports.paginatePhones = (req, res, next) => {
    const {page = 1, results = 4} = req.query;

    req.pagination = {
        limit: Number(results),
        offset: (page - 1) * results,
    };

    next();
};