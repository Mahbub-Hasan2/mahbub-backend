const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        // console.log('not auth token')
        return res.status(401).send({ message: 'unauthorized ccess' })
    }
    const token = authHeader.split(' ')[1];
    // console.log('token= ', token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECTET, (err, decoded) => {
        if (err) {
            // console.log('verify token err')
            // return res.status(401).send({ message: 'Forbidden access' })
            // console.log('error jwt proses errr');
            return {}
        }
        else {
            // console.log('suss jwt proses suss');

            req.decoded = decoded;

            next();
        }
    })

};


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
    verifyJWT,
    verifyAdminJWT
}