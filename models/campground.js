const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;
const { cloudinary } = require('../cloudinary/index')

//让ImageSchema nested在CampgroundSchema里
const ImageSchema = new Schema({
    url: String,
    filename: String
})

//对ImageSchema使用virtual property
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

//Virtuals in JSON时加入如下，否则mongoose默认virtual proterty不能转换到JSON中
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'], //  must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

//对campgroundSchema加入virtual property，以供Mapbox Popup使用
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href='/campgrounds/${this._id}'>${this.title}</a></strong>
    <p>${this.description.substring(0, 50)}...</p>
    `
})


CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {

        //删除campground的同时跟campground关联的review
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });

        //删除campground的同时删除跟campground关联的cloudinary图片
        for (let img of doc.images) {
            await cloudinary.uploader.destroy(img.filename)
        }
    }
});



module.exports = mongoose.model('Campground', CampgroundSchema);