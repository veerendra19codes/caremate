const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    deadline: {
        type: Date, 
    },
    category: {
        type: String,
        enum: ['work', 'personal', 'shopping'], 
        required: true,
        default: "work",
    },
    status: {
        type: Boolean,
        default: false
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true }); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["caretaker", "health expert", "client"],
        default: "client"
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    age: {
        type: Number
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    gender: {
        type: String
    },
    caretaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    lat: {
        type: Number,
    },
    lon: {
        type: Number
    },
    profileImageUrl: {
        type: String
    },
    guardianName: {
        type:String,
    },
    guardianPhoneNumber: {
        type: String,
    },
    guardianAddress: {
        type: String,
    },
    guardianCity: {
        type: String,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);

module.exports = { User, Task };