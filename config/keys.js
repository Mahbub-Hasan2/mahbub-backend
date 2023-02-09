const dotenv = require('dotenv');
dotenv.config();

const key = {
    // mongoURI: `mongodb+srv://deerPerfumDBUser:${process.env.MONGO_URI}@cluster0.k7vmnsm.mongodb.net/?retryWrites=true&w=majority`
    mongoURI: `mongodb+srv://mahbub:${process.env.MONGO_URI}@cluster0.i0z7qvl.mongodb.net/?retryWrites=true&w=majority`
}
module.exports = key;