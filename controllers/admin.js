const jwt = require("jsonwebtoken");
const admin = require('../models/admin.js');

const loginAdminToken = async (req, res) => {
    const user = req.body;
    try {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_ADMIN_SECTET, {
            expiresIn: '1d'
        });
        // console.log(accessToken)
        res.status(200).json({ accessToken });

    } catch (err) {
        res.status(409).json({ message: "error" });
    }
}


 const createAdmin = async (req, res) => {
    console.log('hello')
    const us = req.body;
    const newAdmin = admin(us);
    newAdmin.password = newAdmin.generateHash(us.password)

    const requester = req.decoded.email;
    const requesterAccount = await admin.findOne({email: requester})

    if(requesterAccount.email){
        try {
            await newAdmin.save();
            res.status(201).json(newAdmin);
        } catch (err) {
            res.status(409).json({ message: err.message });
        }
    }
    else {
        res.status(409).json({ message: "not acsess" });
    }

    
}

 const loginAdmin = async (req, res) => {
    const paylod = {email: req.body.email}

    const accessToken = await jwt.sign(paylod, process.env.ACCESS_TOKEN_ADMIN_SECTET, {
        expiresIn: '1d'
    });

    if (accessToken) {
        try {
            admin.findOne({ email: req.body.email }, (err, ad) => {
                if (ad) {
                    if (!ad.validPassword(req.body.password)) {
                        res.status(404).json({ message: "wrong password" });
                    } else {
                        res.status(200).json({admin: ad, accessToken });
                    }
                }
                else {
                    res.status(404).json({ message: "failed" });
                }
            });

        }
        catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    else{
        res.status(409).json({ message: 'error' });
    }


}

module.exports = {
    createAdmin,
    loginAdmin
}