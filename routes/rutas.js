const usersRouter = require("./usersRouter");
const placesRouter = require("./placesRouter");

function routerApi(app) {
    app.use("/users", usersRouter);
    app.use("/places", placesRouter);
}

module.exports = routerApi;