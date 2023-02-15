const jwt = require("jsonwebtoken");


const verifyAdminJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_ADMIN_SECTET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'unauthorized access' })
        }
        else {
            req.decoded = decoded;
            next();
        }
    })

}

module.exports = {
    verifyAdminJWT
}