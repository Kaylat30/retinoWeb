// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface NutritionState {
//   savedFoods: Food[];
// }

// interface Food {
//   id: string;
//   name: string;

// }

// const initialState: NutritionState = {
//   savedFoods: [],
// };

// const nutritionSlice = createSlice({
//   name: 'nutrition',
//   initialState,
//   reducers: {
//     addFood: (state, action: PayloadAction<Food>) => {
//       state.savedFoods.push(action.payload);
//     },
//     deleteFood: (state, action: PayloadAction<string>) => {
//       state.savedFoods = state.savedFoods.filter(food => food.id !== action.payload);
//     },
    
//   },
// });

// export const { addFood, deleteFood } = nutritionSlice.actions;
// export default nutritionSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NutritionRecord {
  id: string;
  food: string;
  date: string;
}

interface RecordsState {
  savedFoods: NutritionRecord[];
}

const initialState: RecordsState = {
  savedFoods: [],
};

const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {
    addNutritionRecords(state, action: PayloadAction<NutritionRecord[]>) {
      state.savedFoods = [...state.savedFoods, ...action.payload];
    },
    deleteNutritionRecords(state, action: PayloadAction<string>) {
      state.savedFoods = state.savedFoods.filter(food => food.id !== action.payload);
    },
  },
});

export const { addNutritionRecords, deleteNutritionRecords } = nutritionSlice.actions;
export default nutritionSlice.reducer;