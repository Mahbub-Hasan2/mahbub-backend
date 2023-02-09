const jwt = require("jsonwebtoken");
const products = require("../models/projects.js")
// import * as dotenv from 'dotenv'

// // import { deleteUser } from "./controllers/user.js";
// dotenv.config();

// const loginToken = async (req, res) => {
//     const user = req.body;
//     try {

//         const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECTET, {
//             expiresIn: '1d'
//         });
//         // console.log(accessToken)
//         res.status(200).json({ accessToken });

//     } catch (err) {
//         res.status(409).json({ message: "error" });
//     }
// }


const addProject = async (req, res) => {
    const ress = products(req.body);
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

const updateProduct = async (req, res) => {
    const us = req.body;
    const id = us._id
    var query = { '_id': id };
    const newProduct = products(us);

    try {
        await products.findOneAndUpdate(query, newProduct, { upsert: true });
        res.status(201).json({ message: "successfully updated" });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

// new code mahbub // end

const getProducts = async (req, res) => {
    const page = req.params.page > 0 ? req.params.page : 10;
    try {
        const requests = await products.find().limit(page);
        res.status(200).json(requests);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//  const getProductsForDash = async (req, res) => {
//     var perPage = 10;
//     var page = req.params.page > 0 ? req.params.page : 0;
//     try {
//         const requests = await products
//             .find()
//             .limit(perPage).skip(perPage * page)
//         // .sort({ name: "desc" });

//         res.status(200).json(requests);

//     } catch (err) {
//         res.status(409).json({ message: err.message });
//     }
// }

const getProductsForDash = async (req, res, next) => {
    try {
        // We destructure the req.query object to get the page and limit variables from url 
        const {
            page,
            product_id,
            product_search_text,
            product_status,
            limit = 10
        } = req.query;

        let filter = {};
        if (product_search_text === '' && product_status === '') {
            filter = {}
        }
        else {
            filter = {
                $or: [
                    { name: { $regex: `${product_search_text}`, $options: "i" } },
                    { category: product_search_text },
                    { category: product_status },
                    { nav: product_search_text }
                ]
            }
        }
        // console.log(filter)
        const requests = await products.find(filter)
            // We multiply the "limit" variables by one just to make sure we pass a number and not a string
            .limit(limit * 1)
            // I don't think i need to explain the math here
            .skip(page * limit)
            // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
            .sort({ createdAt: -1 })

        // Getting the numbers of products stored in database
        const count = await products.countDocuments();

        return res.status(200).json({
            products: requests,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalProducts: count,
        });
    } catch (err) {
        next(err);
    }
};

const getProduct = async (req, res) => {
    try {
        const requests = await products.find({ _id: req.params.id })
        res.status(200).json(requests[0]);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}
const getProductsByNavFilter = async (req, res) => {
    const value = req.body.nav;
    // console.log(req.body)
    try {
        const requests = await products.find({ nav: { $regex: `${value}`, $options: "i" } });
        res.status(200).json(requests);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}
const getSearch = async (req, res) => {
    const value = req.body.category;
    // console.log(req.body)
    try {
        const requests = await products.find({ category: { $regex: `${value}`, $options: "i" } });
        res.status(200).json(requests);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}
const deleteProduct = async (req, res) => {
    try {
        await products.deleteOne({ _id: req.params.id });
        res.status(201).json({ message: "successfully deleted" });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

module.exports = {
    // loginToken,
    addProject,
    // updateProduct,
    // getProducts,
    // getProductsForDash,
    // getProduct,
    // getProductsByNavFilter,
    // getSearch,
    // deleteProduct
}