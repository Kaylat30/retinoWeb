import mongoose from "mongoose";

const eyeScreeningSchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    clinic: {
        type: String,
    },
    user: {
        type: String,
        required: true
    },
    risk: {
        type: Number,
    },
    visual: {
        type: Number,
    },
    intraocular: {
        type: Number,
    },
    serum: {
        type: Number,
    },
},{ timestamps: true });

const EyeScreening = mongoose.model('EyeScreening', eyeScreeningSchema);

export default EyeScreening;
