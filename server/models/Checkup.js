import mongoose from "mongoose";

const checkupSchema = new mongoose.Schema({
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
    glucose: {
        type: Number,
    },
    hemoglobin: {
        type: Number,
    },
    urinalysis: {
        type: Number,
    },
},{ timestamps: true });

const Checkup = mongoose.model('Checkup', checkupSchema);

export default  Checkup;
