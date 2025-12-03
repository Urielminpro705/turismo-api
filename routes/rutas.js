const usersRouter = require("./usersRouter");
const placesRouter = require("./placesRouter");
const reviewsRouter = require("./reviewsRouter");

function routerApi(app) {
    app.use("/users", usersRouter);
    app.use("/places", placesRouter);
    app.use("/reviews", reviewsRouter);
}

module.exports = routerApi;