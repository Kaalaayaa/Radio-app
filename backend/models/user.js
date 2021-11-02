import mongoose from "mongoose"
import { hash } from "../libs/crypto.js"

const required = true
const unique = true


const userSchema = new mongoose.Schema({
    name: { type: String, required},
    email: { type: String, required, unique, minlength: 3 },
    password: { type:String, required, minlength: 8 },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userComments"
    }]
})

userSchema.statics.register = async function(data) {

    
    const hashed = await hash(data.password)

    data.password = hashed

    return User.create(data)
}

const User = mongoose.model("radioUsers", userSchema)

export default User