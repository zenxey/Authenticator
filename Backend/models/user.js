const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    password: String

})
module.exports = mongoose.model('user', userSchema, 'users') // syntax (model name[i.e. user], Schema=userschema defined above, collection name [made in mLAB] i.e. users)
    //above mongoose model can be used to perform crud opertions
    //not connect to the DB connected
    //all db request will be managed in the api route so DB connection will be configured in the api.js