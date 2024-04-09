import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String
});

const Image = mongoose.model('Image', imageSchema);

export default Image;