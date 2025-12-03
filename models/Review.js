const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "place",
        required: true
    },
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
            validator: value => value * 2 === Math.floor(value* 2),
            message: "La calificacion debe de ser en incrementos de .5"
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model("review", ReviewSchema);