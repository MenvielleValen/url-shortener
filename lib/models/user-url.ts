import mongoose from "mongoose";

const userUrlSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: false
    },
    url:{
        type: mongoose.Types.ObjectId,
        ref: 'Url',
        required: true,
        unique: false
    },
    description: {
        type: String,
        default: ''
    }
});


const UserUrl = mongoose.models.UserUrl || mongoose.model('UserUrl', userUrlSchema);

export default UserUrl;