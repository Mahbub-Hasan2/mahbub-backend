const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    name: { type: String, required: true, },
    description: { type: String, required: true, },
    descriptionBN: { type: String, required: false, },
    seller: { type: String, required: false, },
    category: { type: String, required: true, },
    nav: String,
    stock: { type: String, required: true, },
    cardImg: { type: String, required: true, },
    price: { type: String, required: true, },
    prvPrice: { type: String, required: true, },
    galleryImages: Array,
    star: Number,
    starCount: Number,
});

const projects = mongoose.model("project", projectSchema);
module.exports = projects;