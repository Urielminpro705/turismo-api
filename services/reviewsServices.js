const Review = require("../models/Review");
const User = require("../models/User");
const Place = require("../models/Place");

class reviewsServices {
    getAllReviews () {
        return Review.find()
            .then(data => {
                return {
                    succeded: true,
                    statusCode: 200,
                    message: "OK",
                    data: data
                }
            })
    }

    async getReviewById (id) {
        return Review.findOne({ _id: id })
            .then(review => {
                if (review != null) {
                    return {
                        succeded: true,
                        statusCode: 200,
                        message: "OK",
                        data: review
                    }
                } else {
                    const err = new Error("No se encontro la review");
                    err.statusCode = 404;
                    err.data = {};
                    err.customed = true;

                    throw err;
                }
            })
    }

    async createReview ({ userId, placeId, comment, rating }) {
        const missingFields = [];

        if (!userId) missingFields.push("userId");
        if (!placeId) missingFields.push("placeId");
        if (!comment) missingFields.push("comment");
        if (rating === undefined) missingFields.push("rating");

        if (missingFields.length > 0) {
            const err = new Error(`Faltan estos campos necesarios: ${missingFields.join(", ")}`);
            err.statusCode = 400;
            err.data = {};
            err.customed = true;

            throw err;
        }

        if (!await this.doesUserExist(userId)){
            const err = new Error("El usuario no existe");
            err.statusCode = 404;
            err.data = {};
            err.customed = true;

            throw err;
        }

        if (!await this.doesPlaceExist(placeId)){
            const err = new Error("El lugar no existe");
            err.statusCode = 404;
            err.data = {};
            err.customed = true;

            throw err;
        }

        if (this.userHasReviewsForThisPlace(userId, placeId)) {
            const err = new Error("El usuario ya dio una reseña a este lugar");
            err.statusCode = 409;
            err.data = {};
            err.customed = true;

            throw err;
        }

        const newReview = {
            userId,
            placeId,
            comment,
            rating
        }

        return Review.create(newReview)
            .then(data => {
                return {
                    succeded: true,
                    statusCode: 201,
                    message: "Reseña creada",
                    data: data
                }
            })
    }

    async updateReview (id, newData) {
        const { userId, placeId, comment, rating } = newData;
        
        const review = {}

        if (comment) review.comment = comment;
        if (rating) review.rating = rating;
        if (userId) {
            if (!await this.doesUserExist(userId)){
                const err = new Error("El usuario no existe");
                err.statusCode = 404;
                err.data = {};
                err.customed = true;

                throw err;
            }
            
            review.userId = userId;
        };

        if (placeId) {
            if (!await this.doesPlaceExist(placeId)){
                const err = new Error("El lugar no existe");
                err.statusCode = 404;
                err.data = {};
                err.customed = true;
    
                throw err;
            }

            review.placeId = placeId
        };

        if (this.userHasReviewsForThisPlace(userId, placeId)) {
            const err = new Error("El usuario ya dio una reseña a este lugar");
            err.statusCode = 409;
            err.data = {};
            err.customed = true;

            throw err;
        }

        return Review.updateOne(
            { _id: id },
            { $set: review }
        )
            .then(data => {
                if (data.matchedCount === 0) {
                    const err = new Error("No se encontro la review");
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
                    data: review
                }
            })
    }

    async deleteReview (id) {
        return Review.deleteOne({ _id: id })
            .then(data => {
                if (data.deletedCount > 0) {
                    return {
                        succeded: true,
                        statusCode: 200,
                        message: "Eliminado",
                        data: {id}
                    }
                } else {
                    const err = new Error("No se encontro la review");
                    err.statusCode = 404;
                    err.data = {};
                    err.customed = true;

                    throw err;
                }
            })
    }

    async doesUserExist (userId) {
        const user = await User.findOne({ _id: userId });
        return user ? true : false;
    }

    async doesPlaceExist (placeId) {
        const place = await Place.findOne({ _id: placeId });
        return place ? true : false;
    }

    async userHasReviewsForThisPlace(userId, placeId) {
        const reviews = Review.find({ userId, placeId });
        return reviews.length > 0 ? true : false;
    }
}

module.exports = reviewsServices;