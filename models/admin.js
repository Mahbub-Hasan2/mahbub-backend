const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema({
    email : {
        type: String,
        unique: true,
        match: /.+\@.+\..+/
    },
    password : String
});

// hash the password
adminSchema.method({
    // Generate Hash of the password
    generateHash (password)  {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
    // Compare Hash of the password
    validPassword (password)  {
        return bcrypt.compareSync(password, this.password);
      }
});


const admin = mongoose.model("admin", adminSchema);
module.exports = admin;