import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  GetAllNutritionRecords,
  AddNutritionRecord,
  DeleteNutritionRecord,
  selectNutritionRecords,
} from '../slice/nutritionSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoRemoveCircleSharp, IoTrashBin } from 'react-icons/io5';


interface NutritionRecord {
  _id: string;
  food: string;
  date: string;
}

const DiabeticFoodForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nutritionRecords = useSelector<RootState, NutritionRecord[]>(selectNutritionRecords);

  const [unsavedFoods, setUnsavedFoods] = useState<string[]>([]);

  useEffect(() => {
    dispatch(GetAllNutritionRecords());
  }, [dispatch]);

  const addFoodField = () => {
    setUnsavedFoods([...unsavedFoods, '']);
  };

  const handleFoodChange = (text: string, index: number) => {
    const updatedFoods = [...unsavedFoods];
    updatedFoods[index] = text;
    setUnsavedFoods(updatedFoods);
  };

  const deleteUnsavedFood = (index: number) => {
    const updatedFoods = [...unsavedFoods];
    updatedFoods.splice(index, 1);
    setUnsavedFoods(updatedFoods);
  };

  const saveFoods = async () => {
    try {
      const currentDate = new Date().toISOString();
      const foodsWithDate = unsavedFoods.map((food) => ({ food, date: currentDate }));
      const response = await dispatch(AddNutritionRecord(foodsWithDate)).unwrap();
      if (response) {
        toast.success('Foods added successfully');
        setUnsavedFoods([]);
        dispatch(GetAllNutritionRecords());
      }
    } catch (error) {
      toast.error('Adding Foods Failed: ' + error);
    }
  };

  const deleteFood = async (nutritionId: string) => {
    try {
      await dispatch(DeleteNutritionRecord(nutritionId)).unwrap();
      toast.success('Food deleted successfully');
      dispatch(GetAllNutritionRecords());
    } catch (error) {
      toast.error('Deleting Foods Failed: ' + error);
    }
  };

  const groupedFoods = nutritionRecords.reduce((groups: { [key: string]: NutritionRecord[] }, food) => {
    const date = new Date(food.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(food);
    return groups;
  }, {});

  return (
    <div className="p-4">
      <ToastContainer position="bottom-left" />
      {unsavedFoods.map((food, index) => (
        <div className="flex items-center mb-2" key={index}>
          <input
            type="text"
            className="flex-1 h-10 border border-gray-400 rounded px-3"
            placeholder={`Food ${index + 1}`}
            value={food}
            onChange={(e) => handleFoodChange(e.target.value, index)}
          />
          <button onClick={() => deleteUnsavedFood(index)} className="ml-2 text-red-500">
            < IoRemoveCircleSharp />
          </button>
        </div>
      ))}

      <button onClick={addFoodField} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
        Add Food
      </button>

      <button onClick={saveFoods} className="bg-green-500 text-white py-2 px-4 rounded mt-4">
        Save
      </button>

      {Object.entries(groupedFoods).map(([date, foods]) => (
        <div key={date} className="mt-4">
          <h2 className="font-bold text-lg mb-2">{date}</h2>
          <div className="overflow-y-auto max-h-56">
            {foods.map((food) => (
              <div key={food._id} className="flex items-center mb-2">
                <span>{food.food}</span>
                <button onClick={() => deleteFood(food._id)} className="ml-2 text-red-500">
                  <IoTrashBin />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiabeticFoodForm;
