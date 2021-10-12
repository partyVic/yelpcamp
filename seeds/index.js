const Campground = require('../models/campground.js');
const cities = require('./cities.js');
const { places, descriptors } = require('./seedHelpers.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database Connected")
});

const sample = function (array) {
    return array[Math.floor(Math.random() * array.length)]
}


const seedDB = async () => {
    await Campground.deleteMany({})

    //seed 50 new camps
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 50) + 10;
 
        const camp = new Campground({
            author: '615572daaaec00088887ac7a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione amet vero ab. Laborum dolor eum quibusdam dolorum placeat fugit? Esse quos accusantium rem deserunt beatae ab atque odio? Corrupti, iusto!',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [{
                // url: "https://res.cloudinary.com/dsk0gjgdw/image/upload/v1633415022/YelpCamp/apnwaicqzyblsdgn1bnh.jpg",
                url: 'https://res.cloudinary.com/dsk0gjgdw/image/upload/v1633579354/YelpCamp/fb0oq53r1gt0lgr9rpty.jpg',
                // filename: "YelpCamp/apnwaicqzyblsdgn1bnh"
                filename: 'YelpCamp/fb0oq53r1gt0lgr9rpty'
            }]
        })
        await camp.save()
    }
};

seedDB().then(() => {
    mongoose.connection.close()
});

