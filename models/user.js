import mongoose from 'mongoose';
import crypto from 'crypto';
import {v1 as uuidv1} from 'uuid';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            require: true,
            unique: 32
        },
        image: {
            type: String,
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: {
            type: String
        }, 
        role: {
            type: Number,
            default: 0
        },
        date: {
            type: Date
        }
    },
    {timestamps: true}
);

userSchema.virtual("password").set(function(password){
    this.salt = uuidv1();
    this.hashed_password = this.encrytPassword(password);
});

userSchema.methods = {
    authenticate: function(plainText){
        return this.encrytPassword(plainText) === this.hashed_password;

    },
    encrytPassword: function(password){
        if(!password) return "";
        try {
            return crypto
            .createHmac("sha1", this.salt)
            .update(password)
            .digest("hex")
        } catch (error) {
            return "";
            
        }
    }
}
module.exports = mongoose.model("User", userSchema);