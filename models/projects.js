const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    cardImg: { type: String, required: true, },
    projectName: { type: String, required: true, },
    liveLink: { type: String, required: true, },
    liveLink2: String,
    github: String,
    someText: String,
    skills: { type: Array, required: true, },
    description: String,
    order: { type: Number, default: 1 },
});

const projects = mongoose.model("project", projectSchema);
module.exports = projects;