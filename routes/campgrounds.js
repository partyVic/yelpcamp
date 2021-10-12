const express = require('express');
const router = express.Router();
const Campground = require('../models/campground.js');
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds')
const { isLoggedIn, isAuthor, joiValidateCampground } = require('../middleware.js')
const multer = require('multer')
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), joiValidateCampground, catchAsync(campgrounds.createCampground))
// .post(upload.array('image'), (req, res) => {
//     console.log(req.body, req.files)
//     res.send('Testing')
// })

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), joiValidateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));


module.exports = router