import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { GetAllEyeScreenings,selectEyeScreeningsStatus,selectEyeScreeningsError} from '../slice/eyescreeningSlice';
import { AppDispatch } from '../store';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

interface EyeScreening {
    date: string;
    risk?: number;
    visual?: number
    intraocular?: number;
    serum?: number;
  }
  
const EyeScreening: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectEyeScreeningsStatus);
  const error = useSelector(selectEyeScreeningsError);
  //const eyeScreenings = useSelector(selectEyeScreenings);
  const [tableData, setTableData] = useState<EyeScreening[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [lastDate, setLastDate] = useState<Date>(new Date());

  const weekdayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };

  const weekdayString = lastDate.toLocaleDateString('en-US', weekdayOptions);
  const dateString = lastDate.toLocaleDateString('en-US', dateOptions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(GetAllEyeScreenings()).unwrap();
        const allEyeScreeningsExcludingLastOne : EyeScreening[]= data.slice(0, data.length - 1);
        setTableData(allEyeScreeningsExcludingLastOne);
        
        if (data.length > 0) {
          const lastAppointmentDate = new Date(data[data.length - 1].date);
          setLastDate(lastAppointmentDate);
        }
      } catch (error) {
        console.error('Error fetching eye screenings:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const toggleContent = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-3xl mb-4 text-center">Eye Screening</h1>
      <h2 className="font-bold text-lg mb-2 ml-10">Screening reminder</h2>

      <div className="bg-white rounded p-6 shadow-md mb-4 mx-auto max-w-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-lg">{weekdayString}</span>
          <span className="text-black text-lg">{dateString}</span>
        </div>
      </div>

      <h3 className="text-gray-500 underline mt-6 text-center">Log for previous Eye Screening</h3>

      <div className="bg-white rounded p-4 shadow-md my-6 mx-auto max-w-lg">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
          <span className="w-1/3 text-center font-bold">Date</span>
          <span className="w-1/3 text-center font-bold">Risk</span>
          <span className="w-1/3 text-center font-bold"></span>
        </div>
        {tableData.map((rowData, index) => (
          <div key={index}>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
              <span className="w-1/3 text-center">{new Date(rowData.date).toLocaleDateString('en-US', dateOptions)}</span>
              <span className="w-1/3 text-center">{rowData.risk}%</span>
              <button className="w-1/3 text-center" onClick={() => toggleContent(index)}>
                {expandedIndex === index ? <IoChevronUp/> : <IoChevronDown/>}
              </button>
            </div>
            {expandedIndex === index && (
              <div className="mt-4">
                <p>Risk: {rowData.risk} %</p>
                <p>Visual: {rowData.visual}</p>
                <p>Intraocular: {rowData.intraocular}</p>
                <p>Serum: {rowData.serum}</p>
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

export default EyeScreening;
