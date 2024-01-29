import mongoose from "mongoose";

const userUrlSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: false
    },
    url:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'url',
        required: true,
        unique: false
    },
    description: {
        type: String,
        default: ''
    }
});


export const UserUrl = mongoose?.models?.userurl || mongoose.model('userurl', userUrlSchema);
