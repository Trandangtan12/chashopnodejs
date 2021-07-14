import mongoose from 'mongoose';
const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            require: true,
        },
        image: {
            type: String
        },
    },
    {timeStamps: true}
)

module.exports = mongoose.model('Category', categorySchema);