import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        Required: [true, "Name is Required"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        Required: [true, "Email is Required"]
    },
    password: {
        type: String,
        minlength: 8,
        required: function() {
            return !this.googleId;
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    picture: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "user", "guest"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', userSchema)