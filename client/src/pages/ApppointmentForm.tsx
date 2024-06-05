import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store'; 
import {
  GetAllAppointments,
  UpdateAppointment,
  selectAppointments,
  selectAppointmentsStatus,
  selectAppointmentsError,
} from '../slice/appointmentsSlice';
import { toast } from 'react-toastify';

const ResultInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector(selectAppointments);
  const status = useSelector(selectAppointmentsStatus);
  const error = useSelector(selectAppointmentsError);

  const [result, setResult] = useState<string>('');
  
  useEffect(() => {
    dispatch(GetAllAppointments());
  }, [dispatch]);

  const handleSave = async () => {
   
      try {

        if (appointments.length > 0) {
          const id = appointments[appointments.length - 1]._id;
          const add = await dispatch(UpdateAppointment({ id, result })).unwrap();
          if (add) {
            toast.success('Appointment details added successfully', {
              position: 'bottom-left',
            });
          }
        }
      } catch (err) {
        alert('Error updating appointment');
      }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Appointment Result</h1>
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium">Result:</label>
        <input
          type="text"
          className="h-10 border border-gray-400 rounded px-3"
          onChange={(e) => setResult(e.target.value)}
          value={result}
        />
        
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          onClick={handleSave}
        >
          Save
          {/* {status === 'loading' && <p>Saving...</p>:<p>Save</p>} */}
          
        </button>
      </div>
      
      {status === 'failed' && <p className="text-red-600">Error: {error}</p>}
    </div>
  );
};

export default ResultInput;
