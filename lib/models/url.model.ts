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


const Url = mongoose.models.Url || mongoose.model('Url', urlSchema);

export default Url;