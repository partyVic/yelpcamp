const Campground = require('../models/campground.js');
const { cloudinary } = require('../cloudinary/index')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapBoxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })


module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index.ejs', { campgrounds, title: undefined })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new.ejs', { title: "Add new campgrounds" })
}

module.exports.createCampground = async (req, res, next) => {

    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()

    const campground = new Campground(req.body.campground)
    campground.geometry = geoData.body.features[0].geometry
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.author = req.user._id

    await campground.save()
    req.flash('success', 'Successfully made a new Campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find the campground!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show.ejs', { campground, title: `${campground.title}` })
}

module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Cannot edit the campground!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit.ejs', { campground })
}

module.exports.updateCampground = async (req, res, next) => {
    const { id } = req.params
    // console.log(req.body.deleteImages)
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground, { runValidators: true })

    //将上传的图片信息加入campground
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.images.push(...imgs)

    await campground.save()

    //删除图片
    if (req.body.deleteImages) {
        //删除cloudinary图片
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename)
        }
        //删除mongoDB图片
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }


    req.flash('success', 'Successfully update Campground!')
    res.redirect(`/campgrounds/${campground._id}`)
    // res.send({...req.body.campground})
}

module.exports.deleteCampground = async (req, res, next) => {
    await Campground.findByIdAndDelete(req.params.id)
    req.flash('success', 'Successfully deleted a campground!')
    res.redirect('/campgrounds')
}