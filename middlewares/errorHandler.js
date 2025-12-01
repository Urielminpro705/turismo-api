function logErrors(err, req, res, next) {
    console.error("Error interno del servidor: ",err);
    next(err);
}

function errorHandler(err, req, res, next) {
    if (err.customed) {
        return res.status(err.statusCode).json({
            message: err.message,
            data: err.data
        });
    } 

    return res.status(500).json({
        message: "Error interno del servidor",
        data: {}
    });
}

module.exports = {logErrors, errorHandler};