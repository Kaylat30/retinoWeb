import Nutrition from '../models/Nutrition.js'

// Add new nutrition record
export const addNutrition = async (req, res) => {
    try {
        const { foods } = req.body;
        
        const savedNutritionRecords = await Promise.all(foods.map(async (foodItem) => {
            const { food, date } = foodItem;
            const nutrition = new Nutrition({ food, date, user: req.user._id });
            return await nutrition.save();
        }));

        res.status(201).json({ 
            message: 'Nutrition records added successfully', 
            Nutrition: savedNutritionRecords 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Get all nutrition records of logged in user
export const getNutritionRecords = async (req, res) => {
    try {
        const nutritionRecords = await Nutrition.find({ user : req.user._id });
        res.status(200).json(nutritionRecords);
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
};

// Update nutrition record
export const updateNutritionRecord = async (req, res) => {
    try {
        const {NutritionId,food,calories,date} = req.body
        const updatedNutrition = await Nutrition.findByIdAndUpdate(NutritionId,
            {food:food,calories:calories,date:date},
            {new:true});
        res.status(200).json({ message: 'Nutrition record updated successfully', Nutrition: updatedNutrition });
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
};

// Delete nutrition record
export const deleteNutritionRecord = async (req, res) => {
    try {
        const { NutritionId } = req.body;
        await Nutrition.findByIdAndDelete(NutritionId);
        res.status(200).json({ message: 'Nutrition Item record deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false,error: error.message });
    }
};
