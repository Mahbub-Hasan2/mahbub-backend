const jwt = require("jsonwebtoken");
const project = require("../models/projects.js")
// import * as dotenv from 'dotenv'

// // import { deleteUser } from "./controllers/user.js";
// dotenv.config();




const addProject = async (req, res) => {
    const ress = project(req.body);
    // console.log(req.body)
    try {
        await ress.save();
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}
// export const updateProduct = async (req, res)=>{    
//     try{
//         const requests = await level_request.find({completed:false});
//         res.status(409).json(requests);
//         } catch(err){
//         res.status(409).json({message: err.message});
//     }
// }

// new code mahbub // start

const updateProject = async (req, res) => {
    const us = req.body;
    const id = us._id
    var query = { '_id': id };
    const newProduct = project(us);

    try {
        await project.findOneAndUpdate(query, newProduct, { upsert: true });
        res.status(201).json({ message: "successfully updated" });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

const changeProjectPosition = async (req, res) => {
    const us = req.body;
    const id = us._id
    var query = { '_id': id };

    try {
        await project.findOneAndUpdate(query, {
            $set: {
                order: us.order
            }
        });
        res.status(201).json({ message: "successfully updated" });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}


const getProjects = async (req, res) => {
    const page = req.params.page > 0 ? req.params.page : 10;
    try {
        const requests = await project.find().limit(page).sort({ order: 1 });
        res.status(200).json(requests);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getProject = async (req, res) => {
    try {
        const requests = await project.find({ _id: req.params.id })
        res.status(200).json(requests[0]);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}


const deleteProject = async (req, res) => {
    try {
        await project.deleteOne({ _id: req.params.id });
        res.status(201).json({ message: "successfully deleted" });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

module.exports = {
    // loginToken,
    addProject,
    updateProject,
    getProjects,
    getProject,
    deleteProject,
    changeProjectPosition
}