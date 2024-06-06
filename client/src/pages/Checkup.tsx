import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { GetAllCheckups, selectCheckupsStatus, selectCheckupsError } from '../slice/checkupsSlice';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
//import { toast } from 'react-toastify';

interface Checkup {
  _id: string;
  date: string;
  clinic?: string;
  glucose?: number;
  hemoglobin?: number;
  urinalysis?: number;
}

const Checkup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  //const checkups = useSelector(selectCheckups);
  const status = useSelector(selectCheckupsStatus);
  const error = useSelector(selectCheckupsError);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [lastDate, setLastDate] = useState<Date>(new Date());
  const [tableData, setTableData] = useState<Checkup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(GetAllCheckups()).unwrap();
        const allCheckupsExcludingLastOne : Checkup[] = data.slice(0, data.length - 1);
        setTableData(allCheckupsExcludingLastOne);
        if (data.length > 0) {
          setLastDate(new Date(data[data.length - 1].date));
        }
        
      } catch (error) {
        console.error('Error fetching diabetic checkups:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const toggleContent = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const weekdayString = lastDate.toLocaleDateString('en-US', { weekday: 'long' });
  const dateString = lastDate.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Diabetic Checkup</h1>
      <p className="text-lg font-bold mb-2 ml-10">Checkup reminder</p>
      <div className="bg-white rounded shadow-md p-4 mx-10">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-lg">{weekdayString}</p>
          <p className="text-black text-lg">{dateString}</p>
        </div>
      </div>
      <p className="text-gray-500 text-center underline mt-4">Log for previous Diabetic Checkups</p>
      <div className="bg-white rounded shadow-md p-4 mt-4 mx-10">
        <div className="flex border-b border-gray-300 pb-2 mb-2">
          <p className="flex-1 text-center font-bold">Date</p>
        </div>
        {tableData.map((checkup, index) => (
          <div key={checkup._id}>
            <div className="flex border-b border-gray-300 pb-2 mb-2">
              <p className="flex-1 text-center">{new Date(checkup.date).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
              <button className="flex-1 text-center" onClick={() => toggleContent(index)}>
              {expandedIndex === index ? <IoChevronUp/> : <IoChevronDown/>}
              </button>
            </div>
            {expandedIndex === index && (
              <div className="mt-2">
                <p>Clinic: {checkup.clinic}</p>
                <p>Glucose: {checkup.glucose}</p>
                <p>Hemoglobin: {checkup.hemoglobin}</p>
                <p>Urinalysis: {checkup.urinalysis}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className="text-red-600">Error: {error}</p>}
    </div>
  );
};

export default Checkup;
