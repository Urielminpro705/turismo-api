const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
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

PlaceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('place', PlaceSchema);