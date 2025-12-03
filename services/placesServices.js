const Place = require("../models/Place");

class placesServices {
    getAllPlaces () {
        return Place.find()
            .then(data => {
                return {
                    succeded: true,
                    statusCode: 200,
                    message: "OK",
                    data: data
                }
            })
    }

    async getPlaceById (id) {
        return Place.findOne({ _id: id })
            .then(place => {
                if (place != null) {
                    return {
                        succeded: true,
                        statusCode: 200,
                        message: "OK",
                        data: place
                    }
                } else {
                    const err = new Error("No se encontro el lugar");
                    err.statusCode = 404;
                    err.data = {};
                    err.customed = true;

                    throw err;
                }
            })
    }

    async createPlace (body) {
        const { name, description, image, latitude, longitude } = body;

        const missingFields = [];

        if (!name) missingFields.push("name");
        if (!description) missingFields.push("description");
        if (!image) missingFields.push("image");
        if (latitude === undefined) missingFields.push("latitude");
        if (longitude === undefined) missingFields.push("longitude");

        if (missingFields.length > 0) {
            const err = new Error(`Faltan estos campos necesarios: ${missingFields.join(", ")}`);
            err.statusCode = 400;
            err.data = {};
            err.customed = true;

            throw err;
        }

        const newPlace = {
            name,
            description,
            image,
            location: {
                type: "Point",
                coordinates: [
                    longitude,
                    latitude
                ]
            }
        }

        return Place.create(newPlace)
            .then(data => {
                return {
                    succeded: true,
                    statusCode: 201,
                    message: "Lugar creado",
                    data: data
                }
            })
    }

    async updatePlace (id, newData) {
        const { name, description, image, latitude, longitude } = newData;
        const previousPlace = await Place.findOne({ _id: id });
        const place = {}

        if (!previousPlace) {
            const err = new Error("No se encontro el lugar");
            err.statusCode = 404;
            err.data = {};
            err.customed = true;

            throw err;
        }
        
        if (name) place.name = name;
        if (description) place.description = description;
        if (image) place.image = image;
        if (longitude !== undefined || latitude !== undefined) {
            place.location = {
                type: "Point",
                coordinates: [
                    longitude ?? previousPlace.location.coordinates[0],
                    latitude ?? previousPlace.location.coordinates[1],
                ]
            }
        }

        return Place.updateOne(
            { _id: id },
            { $set: place }
        )
            .then(data => {
                if (data.matchedCount === 0) {
                    const err = new Error("No se encontro el lugar");
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
                    data: place
                }
            });
    }

    async deletePlace (id) {
        return Place.deleteOne({ _id: id })
            .then(data => {
                if (data.deletedCount > 0) {
                    return {
                        succeded: true,
                        statusCode: 200,
                        message: "Eliminado",
                        data: {id}
                    }
                } else {
                    const err = new Error("No se encontro el lugar");
                    err.statusCode = 404;
                    err.data = {};
                    err.customed = true;

                    throw err;
                }
            })
    }
}

module.exports = placesServices;