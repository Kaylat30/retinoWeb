import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement 
} from 'chart.js';

import { AppDispatch } from '../store';
import { GetAllCheckups, selectCheckups } from '../slice/checkupsSlice';
import { GetAllEyeScreenings, selectEyeScreenings } from '../slice/eyescreeningSlice';
import fishImage from '../assets/fish.jpg';
import eggsImage from '../assets/eggs.jpg';
import milkImage from '../assets/milk.jpg';
import juiceImage from '../assets/juice.jpg';
import chickenImage from '../assets/chicken.jpg';
import spinachImage from '../assets/spinach.jpg';
import vegetablesImage from '../assets/vegetables.jpg';
import saladImage from '../assets/salad.jpg';
import yogurtImage from '../assets/yogurt.jpg';
import brownRiceImage from '../assets/brown_rice.jpg';
import berriesImage from '../assets/berries.jpg';
import nutsImage from '../assets/nuts.jpg';
import breadImage from '../assets/bread.jpg';
import avocadoImage from '../assets/avocado.jpg';
import quinoaImage from '../assets/aquinoa.jpg';
import lentilsImage from '../assets/lentils.jpg';
import potatoImage from '../assets/potato.jpg';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

// Register the necessary chart components
ChartJS.register(
  LineElement,
  BarElement,
  ArcElement, 
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

interface FoodCatProps {
  name: string;
  imageUri: string;
  calories: number;
}

const FoodCat: React.FC<FoodCatProps> = ({ name, imageUri, calories }) => {
  return (
    <div className="relative inline-block h-30 w-45 ml-5 border border-gray-300">
      <img src={imageUri} alt={name} className="object-cover w-full h-full" />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1 flex justify-between text-white">
        <span className="font-bold">{name}</span>
        <span className="font-bold">{calories} Calories</span>
      </div>
    </div>
  );
};

const Insights: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const checkups = useSelector(selectCheckups);
  const eyeScreenings = useSelector(selectEyeScreenings);
  const lineChartRef = useRef<ChartJS<'line'> | null>(null);
  const barChartRef = useRef<ChartJS<'bar', (number | undefined)[], unknown> | null>(null);
  const pieChartRef = useRef<ChartJS<'pie'> | null>(null);

  const slideLeft = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };
  
  const slideRight = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft += 500;
    }
  };

  useEffect(() => {
    dispatch(GetAllCheckups());
    dispatch(GetAllEyeScreenings());
  }, [dispatch]);

  const recommendNutrition = (glucoseLevel: number) => {
    if (glucoseLevel < 3.9) {
      return [
        { name: 'Fish', imageUri: fishImage, calories: 200 },
        { name: 'Eggs', imageUri: eggsImage, calories: 150 },
        { name: 'Milk', imageUri: milkImage, calories: 100 },
        { name: 'Juice', imageUri: juiceImage, calories: 120 },
        { name: 'Chicken Breast', imageUri: chickenImage, calories: 180 },
        { name: 'Spinach', imageUri: spinachImage, calories: 30 }
      ];
    } else if (glucoseLevel >= 3.9 && glucoseLevel <= 6.9) {
      return [
        { name: 'Vegetables', imageUri: vegetablesImage, calories: 80 },
        { name: 'Chicken', imageUri: chickenImage, calories: 250 },
        { name: 'Salad', imageUri: saladImage, calories: 150 },
        { name: 'Yogurt', imageUri: yogurtImage, calories: 120 },
        { name: 'Brown Rice', imageUri: brownRiceImage, calories: 200 },
        { name: 'Berries', imageUri: berriesImage, calories: 50 }
      ];
    } else {
      return [
        { name: 'Nuts', imageUri: nutsImage, calories: 180 },
        { name: 'Whole Grain Bread', imageUri: breadImage, calories: 160 },
        { name: 'Avocado', imageUri: avocadoImage, calories: 200 },
        { name: 'Quinoa', imageUri: quinoaImage, calories: 220 },
        { name: 'Lentils', imageUri: lentilsImage, calories: 230 },
        { name: 'Sweet Potato', imageUri: potatoImage, calories: 130 }
      ];
    }
  };

  const averageGlucose = checkups.length > 0
    ? checkups.slice(-5).reduce((acc, curr) => acc + (curr.glucose ?? 0), 0) / Math.min(checkups.length, 5)
    : 0;

  const pieChartData = {
    labels: ['Urinalysis', 'Hemoglobin', 'Glucose'],
    datasets: [
      {
        data: [
          checkups[checkups.length - 2]?.urinalysis || 0,
          checkups[checkups.length - 2]?.hemoglobin || 0,
          checkups[checkups.length - 2]?.glucose || 0,
        ],
        backgroundColor: ['#FF6347', '#00FFFF', '#FFD700']
      }
    ]
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      {checkups.length > 0 ? (
        <>
          <h2 className="text-lg mb-5">Glucose Levels Over Time</h2>
          <Line
            ref={lineChartRef}
            data={{
              labels: checkups.map(item => new Date(item.date).toDateString()),
              datasets: [{ data: checkups.map(item => item.glucose), label: 'Glucose' }]
            }}
            width={600}
            height={400}
          />
        </>
      ) : (
        <p>No checkup data available.</p>
      )}

      {eyeScreenings.length > 0 ? (
        <>
          <h2 className="text-lg mb-5">Risk Levels Trend</h2>
          <Bar
            ref={barChartRef}
            data={{
              labels: eyeScreenings.map(item => new Date(item.date).toDateString()),
              datasets: [{ data: eyeScreenings.map(item => item.risk), label: 'Risk Levels' }]
            }}
            width={600}
            height={400}
          />
        </>
      ) : (
        <p>No eye screening data available.</p>
      )}

      <div className="flex flex-col items-start bg-white p-5 w-full mt-5">
        <h2 className="text-xl font-bold mb-3">Nutrition For You</h2>

        <div className='flex justify-center sm:mx-8 lg:mx-20 flex-col'>
          <div className='relative flex items-center bg-white rounded-b-md'>
            <IoChevronBack className=' opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
            <div id='slider' className='w-full space-x-4 h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-x-hidden'>
              {recommendNutrition(averageGlucose).map((food, index) => (
                <FoodCat key={index} name={food.name} imageUri={food.imageUri} calories={food.calories} />
              ))}
            </div>
            <IoChevronForward className=' opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
          </div>
        </div>
      </div>

      {checkups.length > 0 ? (
        <>
          <h2 className="text-lg mt-10 mb-5">Latest Checkup Details</h2>
          <Pie
            ref={pieChartRef}
            data={pieChartData}
            width={400}
            height={200}
          />
        </>
      ) : (
        <p>No checkup data available to display pie chart.</p>
      )}
    </div>
  );
};

export default Insights;
