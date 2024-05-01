import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
    food: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    // calories: {
    //     type: Number,
    // },
    date: {
        type: Date,
        default: Date.now
    }
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

export default Nutrition;
