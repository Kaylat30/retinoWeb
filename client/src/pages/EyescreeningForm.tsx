import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store'; 
import {
  GetAllEyeScreenings,
  AddEyeScreening,
  UpdateEyeScreening,
  selectEyeScreenings,
  selectEyeScreeningsStatus,
  selectEyeScreeningsError,
} from '../slice/eyescreeningSlice';
import { toast } from 'react-toastify';

const EyeScreeningForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const eyeScreenings = useSelector(selectEyeScreenings);
  const status = useSelector(selectEyeScreeningsStatus);
  const error = useSelector(selectEyeScreeningsError);

  const [date, setDate] = useState<string>('');
  const [clinic, setClinic] = useState<string>('');
  const [risk, setRisk] = useState<number | undefined>();
  const [visual, setVisual] = useState<number | undefined>();
  const [intraocular, setIntraocular] = useState<number | undefined>();
  const [serum, setSerum] = useState<number | undefined>();

  useEffect(() => {
    dispatch(GetAllEyeScreenings());
  }, [dispatch]);

  const handleSave = async () => {
    const [day, month, year] = date.split('/').map((part) => parseInt(part));
    const parsedDate = new Date(year, month - 1, day);

    if (date && clinic && risk !== undefined && visual !== undefined && intraocular !== undefined && serum !== undefined) {
      try {
        if (eyeScreenings.length > 0) {
          const id = eyeScreenings[eyeScreenings.length - 1].id;
          await dispatch(UpdateEyeScreening({ id, clinic, risk, visual, intraocular, serum })).unwrap();
          alert('Eye screening details updated successfully');
        }

        const add = await dispatch(AddEyeScreening(parsedDate.toISOString()));
        if (add) {
          toast.success('Eye screening details added successfully', {
            position: 'bottom-left',
          });
        }
      } catch (err) {
        alert('Error updating eye screening');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Eye Screening Details</h1>
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
        <label className="text-lg font-medium">Risk:</label>
        <input
          type="number"
          className="h-10 border border-gray-400 rounded px-3"
          onChange={(e) => setRisk(e.target.value ? parseFloat(e.target.value) : undefined)}
          value={risk}
        />
        <label className="text-lg font-medium">Visual:</label>
        <input
          type="number"
          className="h-10 border border-gray-400 rounded px-3"
          onChange={(e) => setVisual(e.target.value ? parseFloat(e.target.value) : undefined)}
          value={visual}
        />
        <label className="text-lg font-medium">Intraocular:</label>
        <input
          type="number"
          className="h-10 border border-gray-400 rounded px-3"
          onChange={(e) => setIntraocular(e.target.value ? parseFloat(e.target.value) : undefined)}
          value={intraocular}
        />
        <label className="text-lg font-medium">Serum:</label>
        <input
          type="number"
          className="h-10 border border-gray-400 rounded px-3"
          onChange={(e) => setSerum(e.target.value ? parseFloat(e.target.value) : undefined)}
          value={serum}
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

export default EyeScreeningForm;
