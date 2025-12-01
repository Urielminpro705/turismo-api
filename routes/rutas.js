const usersRouter = require("./usersRouter");

function routerApi(app) {
    app.use("/users", usersRouter);
}

module.exports = routerApi;