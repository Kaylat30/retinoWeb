// // components/NutritionForm.tsx
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { addNutritionRecord, getAllNutritionRecords, deleteNutritionRecord } from '../api';
// import { addNutritionRecords, deleteNutritionRecords } from '../store/recordsSlice';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function NutritionForm() {
//   // Redux store selectors
//   const savedFoods = useSelector((state: RootState) => state.savedFoods);

//   // Redux store dispatch
//   const dispatch = useDispatch();

//   // Component state
//   const [unsavedFoods, setUnsavedFoods] = useState<string[]>([]);

//   useEffect(() => {
//     fetchFoods();
//   }, []);

//   const fetchFoods = async () => {
//     try {
//       const response = await getAllNutritionRecords();
//       dispatch(addNutritionRecords(response));
//     } catch (error) {
//       console.error('Error fetching nutrition records:', error.message);
//     }
//   };

//   const addFoodField = () => {
//     setUnsavedFoods([...unsavedFoods, '']);
//   };

//   const handleFoodChange = (text: string, index: number) => {
//     const updatedFoods = [...unsavedFoods];
//     updatedFoods[index] = text;
//     setUnsavedFoods(updatedFoods);
//   };

//   const deleteUnsavedFood = (index: number) => {
//     const updatedFoods = [...unsavedFoods];
//     updatedFoods.splice(index, 1);
//     setUnsavedFoods(updatedFoods);
//   };

//   const saveFoods = async () => {
//     try {
//       const currentDate = new Date().toISOString();
//       const foodsWithDate = unsavedFoods.map(food => ({ food, date: currentDate }));
//       const response = await addNutritionRecord(foodsWithDate);
//       if (response) {
//         toast.success('Foods added successfully');
//         setUnsavedFoods([]);
//         fetchFoods();
//       }
//     } catch (error) {
//       console.error('Error saving foods:', error.message);
//       toast.error(`Adding Foods Failed: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       {/* Render Nutrition form UI */}
//     </div>
//   );
// }

// export default NutritionForm;


export default function NutritionForm() {
  return (
    <div>
      Nutrition form
    </div>
  )
}

