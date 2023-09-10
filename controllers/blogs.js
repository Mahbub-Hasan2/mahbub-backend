const jwt = require("jsonwebtoken");
const project = require("../models/blogs.js")
// import * as dotenv from 'dotenv'

// // import { deleteUser } from "./controllers/user.js";
// dotenv.config();




const addBlog = async (req, res) => {
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

const updateBlog = async (req, res) => {
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

const changeBlogPosition = async (req, res) => {
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


const getBlogs = async (req, res) => {
    const page = req.params.page > 0 ? req.params.page : 10;
    try {
        const requests = await project.find().sort({ order: 1 }).limit(page);
        res.status(200).json(requests);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getBlog = async (req, res) => {
    try {
        const requests = await project.find({ _id: req.params.id })
        res.status(200).json(requests[0]);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}


const deleteBlog = async (req, res) => {
    try {
        await project.deleteOne({ _id: req.params.id });
        res.status(201).json({ message: "successfully deleted" });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

module.exports = {
    // loginToken,
    addBlog,
    updateBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    changeBlogPosition
}