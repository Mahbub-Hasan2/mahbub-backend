const mongoose = require("mongoose");

const projectcardSchema = mongoose.Schema({
    title: { type: String, required: true, },
    video: String,
    photo: String,
    projectUrl: String,
    descriptionId: { type: String, required: true, },
});

const projectcards = mongoose.model("projectcard", projectcardSchema);
module.exports = projectcards;