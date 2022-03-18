import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

mongoose.connect("mongodb+srv://flo7842:asse7842@cluster0.ygt8h.mongodb.net/toto?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Create Schema
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        collection: "user",
        timestamps: true,
    }
);

User.plugin(passportLocalMongoose)



const toto = mongoose.model('user', User, 'user')

console.log(toto, 'db connection model')

// toto.findOne({username: 'dfdf'}).then(async (data) => {
//      let tkkg = await data
//      console.log(tkkg, 'toto')
// })

// toto.register({ username: 'flo7842', password: "false" }, 'toto').then(async(data) => {
//     console.log(data, 'dataaa')
// })

export {toto}

