const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    cardImg: { type: String, required: true, },
    blogTitle: { type: String, required: true, },
    skills: { type: Array, required: false, },
    description: String,
    order: { type: Number, default: 1 },
});

const blogs = mongoose.model("blog", blogSchema);
module.exports = blogs;