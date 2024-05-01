import Checkup from '../models/Checkup.js'

// Add new checkup
export const addCheckup = async (req, res) => {
    try {
        const {date} = req.body
        const checkup = new Checkup({date,user:req.user._id});
        const savedCheckup = await checkup.save();
        res.status(201).json({ message: 'Checkup added successfully' ,Checkup: savedCheckup});
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
};

// Get all checkups of logged in user
export const getCheckups = async (req, res) => {
    try {
        const checkups = await Checkup.find({ user: req.user._id });
        res.status(200).json(checkups);
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
};

// Update checkup
export const updateCheckup = async (req, res) => {
    try {
        const {clinic,checkupId,glucose,hemoglobin,urinalysis} = req.body
        const updatedCheckup = await Checkup.findByIdAndUpdate(checkupId, 
            {$set: {clinic: clinic,glucose:glucose,hemoglobin:hemoglobin,urinalysis:urinalysis}},
            {new: true});
        res.status(200).json({ message: 'Checkup updated successfully',Checkup: updatedCheckup});
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
};

// Delete checkup
export const deleteCheckup = async (req, res) => {
    try {
        const { checkupId } = req.body;
        await Checkup.findByIdAndDelete(checkupId);
        res.status(200).json({ success: true,message: 'Checkup deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
};
