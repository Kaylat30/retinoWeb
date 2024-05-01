import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    result: {
        type: String,
    },
    clinic: {
        type: String,
    },
    date: {
        type: Date,
    }
    
});

const Medication = mongoose.model('Medication', medicationSchema);

export default Medication;
