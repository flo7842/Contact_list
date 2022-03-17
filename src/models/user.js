const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const MONGO_URI = "mongodb+srv://flo7842:asse7842@cluster0.ygt8h.mongodb.net/toto?retryWrites=true&w=majority"

const options = {
    useNewUrlParser: true, useUnifiedTopology: true
}

mongoose
    .connect(MONGO_URI, { keepAlive: true, keepAliveInitialDelay: 300000 })
    .then(console.log(`MongoDB connected ${MONGO_URI}`))
    .catch(err => console.log("je tombe dans lerreur"))
// Create Schema
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String
    },
    password: { 
        type: String
    }
});

User.plugin(passportLocalMongoose)



module.exports = mongoose.model('user', User);

