import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    longUrl: {
        type: String,
        required: true,
        default: '',
    }
});


export const Url = mongoose?.models?.url || mongoose.model('url', urlSchema);
