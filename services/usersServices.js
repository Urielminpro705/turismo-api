const User = require("../models/User");

class usersServices {
    getAllUsers () {
        return User.find()
            .then(data => {
                return {
                    succeded: true,
                    statusCode: 200,
                    message: "OK",
                    data: data
                }
            })
    }

    async getUserById (id) {
        return User.findOne({ _id: id })
            .then(user => {
                if (user != null) {
                    return {
                        succeded: true,
                        statusCode: 200,
                        message: "OK",
                        data: user
                    }
                } else {
                    const err = new Error("No se encontro el usuario");
                    err.statusCode = 404;
                    err.data = {};
                    err.customed = true;

                    throw err;
                }
            })
    }

    async createUser (body) {
        const { name, username, password } = body;

        const missingFields = [];

        if (!name) missingFields.push("name");
        if (!username) missingFields.push("username");
        if (!password) missingFields.push("password");

        if (missingFields.length > 0) {
            const err = new Error(`Faltan estos campos necesarios: ${missingFields.join(", ")}`);
            err.statusCode = 400;
            err.data = {};
            err.customed = true;

            throw err;
        }

        if (await this.doesUserExist(username)){
            const err = new Error("El username ya esta ocupado");
            err.statusCode = 409;
            err.data = {};
            err.customed = true;

            throw err;
        }

        const newUser = {
            name,
            username,
            password
        }

        return User.create(newUser)
            .then(data => {
                return {
                    succeded: true,
                    statusCode: 201,
                    message: "Usuario creado",
                    data: data
                }
            })
    }

    async updateUser (id, newData) {
        const { name, username, password } = newData;
        const user = {}

        if (name) user.name = name;
        if (username) user.username = username;
        if (password) user.password = password;

        return User.updateOne(
            { _id: id },
            { $set: user }
        )
            .then(data => {
                if (data.matchedCount === 0) {
                    const err = new Error("No se encontro el usuario");
                    err.statusCode = 404;
                    err.data = {};
                    err.customed = true;

                    throw err;
                }

                const mensaje = data.modifiedCount > 0 ? 'Actualizado' : 'No se actualizo nada';

                return {
                    succeded: true,
                    statusCode: 200,
                    message: mensaje,
                    data: user
                }
            })
    }

    async deleteUser (id) {
        return User.deleteOne({ _id: id })
            .then(data => {
                if (data.deletedCount > 0) {
                    return {
                        succeded: true,
                        statusCode: 200,
                        message: "Eliminado",
                        data: {id}
                    }
                } else {
                    const err = new Error("No se encontro el usuario");
                    err.statusCode = 404;
                    err.data = {};
                    err.customed = true;

                    throw err;
                }
            })
    }

    async login ({ username, password }) {
        const missingFields = [];

        if (!username) missingFields.push("username");
        if (!password) missingFields.push("password");

        if (missingFields.length > 0) {
            const err = new Error(`Faltan estos campos necesarios: ${missingFields.join(", ")}`);
            err.statusCode = 400;
            err.data = {};
            err.customed = true;

            throw err;
        }

        const user = await User.findOne({ username });
        console.log(user);
        if (user) {
            if (user.password === password) {
                return {
                    succeded: true,
                    statusCode: 200,
                    message: "OK",
                    data: user
                }
            } else {
                const err = new Error("Contraseña incorrecta");
                err.statusCode = 401;
                err.data = {};
                err.customed = true;

                throw err
            }
        } else {
            const err = new Error("No se encontro el usuario");
            err.statusCode = 404;
            err.data = {};
            err.customed = true;

            throw err
        }
    }

    async doesUserExist (username) {
        const user = await User.findOne({ username });
        return user ? true : false;
    }
}

module.exports = usersServices;