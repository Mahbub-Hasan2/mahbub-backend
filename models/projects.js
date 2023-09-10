const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: Array, required: true, },
    skills: { type: Array, required: true, },
    video: String,
    photos: Array,
    date: String,
    projectUrl: String,
    templateType: String,
    github: String,
});

const projects = mongoose.model("project", projectSchema);
module.exports = projects;