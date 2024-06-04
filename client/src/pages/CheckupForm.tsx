import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import {
  GetAllCheckups,
  UpdateCheckup,
  AddCheckup,
  selectCheckups,
  selectCheckupsStatus,
  selectCheckupsError,
} from '../slice/checkupsSlice';
import { toast } from 'react-toastify';

const CheckupForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const checkups = useSelector(selectCheckups);
  const status = useSelector(selectCheckupsStatus);
  const error = useSelector(selectCheckupsError);

  const [date, setDate] = useState<string>('');
  const [clinic, setClinic] = useState<string>('');
  const [glucose, setGlucose] = useState<number>();
  const [hemoglobin, setHemoglobin] = useState<number>();
  const [urinalysis, setUrinalysis] = useState<number>();

  useEffect(() => {
    dispatch(GetAllCheckups());
  }, [dispatch]);

  const handleSave = async () => {

    const [day, month, year] = date.split('/').map((part) => parseInt(part));

        // Create a new Date object using the components
        const parsedDate= new Date(year, month - 1, day);


    if (date && clinic && glucose && hemoglobin && urinalysis) {
      try {
        if (checkups.length > 0) {
          const id = checkups[checkups.length - 1].id;
          await dispatch(UpdateCheckup({ id, clinic, glucose, hemoglobin, urinalysis })).unwrap();
          alert('Checkup details updated successfully');
        }

        const add = await dispatch(AddCheckup(parsedDate.toISOString()))
        if(add){
          toast.success('Checkup details added successfully', {
            position: 'bottom-left',
          });
        }
      } catch (err) {
        alert('Error updating checkup');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Checkup Details</h1>
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium">Date (dd/mm/yyyy):</label>
        <input
          type="text"
          className="h-10 border border-gray-400 rounded px-3"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <label className="text-lg font-medium">Clinic:</label>
        <input
          type="text"
          className="h-10 border border-gray-400 rounded px-3"
          onChange={(e) => setClinic(e.target.value)}
          value={clinic}
        />
        <label className="text-lg font-medium">Glucose:</label>
        <input
          type="text"
          className="h-10 border border-gray-400 rounded px-3"
          onChange={(e) => setGlucose(e.target.value ? parseFloat(e.target.value) : undefined)}
          value={glucose}
        />
        <label className="text-lg font-medium">Hemoglobin:</label>
        <input
          type="text"
          className="h-10 border border-gray-400 rounded px-3"
          onChange={(e) => setHemoglobin(e.target.value ? parseFloat(e.target.value) : undefined)}
          value={hemoglobin}
        />
        <label className="text-lg font-medium">Urinalysis:</label>
        <input
          type="text"
          className="h-10 border border-gray-400 rounded px-3"
          onChange={(e) => setUrinalysis(e.target.value ? parseFloat(e.target.value) : undefined)}
          value={urinalysis}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className="text-red-600">Error: {error}</p>}
    </div>
  );
};

export default CheckupForm;
