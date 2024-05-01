import EyeScreening from '../models/EyeScreening.js'

// Add new eye screening
export const addEyeScreening = async (req, res) => {
    try {
        const {date} = req.body
        const eyeScreening = new EyeScreening({date,user:req.user._id});
        const savedeyScreening = await eyeScreening.save();
        res.status(201).json({ message: 'Eye screening added successfully',EyeScreening:savedeyScreening });
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
};

// Get all eye screenings of logged in user
export const getEyeScreenings = async (req, res) => {
    try {
        const eyeScreenings = await EyeScreening.find({ user: req.user._id });
        res.status(200).json(eyeScreenings);
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
};

// Update eye screening
export const updateEyeScreening = async (req, res) => {
    try {
        const {EyeScreeningId,clinic,visual,intraocular,serum,risk} = req.body
        const updatedEyeScreening = await EyeScreening.findByIdAndUpdate(EyeScreeningId,
            {$set: {clinic: clinic, risk: risk,visual:visual,intraocular:intraocular,serum:serum}},
            {new:true});
        res.status(200).json({ message: 'Eye screening updated successfully',EyeScreening: updatedEyeScreening});
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
};

// Delete eye screening
export const deleteEyeScreening = async (req, res) => {
    try {
        const { EyeScreeningId } = req.body;
        await EyeScreening.findByIdAndDelete(EyeScreeningId);
        res.status(200).json({ message: 'Eye screening deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
};
