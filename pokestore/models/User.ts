// Schema para los usuarios

import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        trim: true,
        maxlenght: 10
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        maxlenght: 20
    },
},{
    timestamps: true,
    versionKey: false
})

export default models.User || model('User', userSchema);