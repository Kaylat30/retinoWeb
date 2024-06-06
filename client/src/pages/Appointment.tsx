import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { GetAllAppointments, AddAppointment, selectAppointments, selectAppointmentsStatus, selectAppointmentsError } from '../slice/appointmentsSlice';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

interface Appointment {
  _id: string;
  clinic: string;
  email: string;
  number: number; 
  description: string;
  message: string;
  name: string;
  date: string;
  result?: string;
}

const Appointment: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector((state: RootState) => selectAppointments(state));
  const status = useSelector((state: RootState) => selectAppointmentsStatus(state));
  const error = useSelector((state: RootState) => selectAppointmentsError(state));
  
  const [tableData, setTableData] = useState<Appointment[]>([]);
  const [lastDate, setLastDate] = useState(new Date());

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [clinic, setClinic] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(-1);

  useEffect(() => {
    dispatch(GetAllAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      const allAppointmentsExcludingLastOne: Appointment[] = appointments.slice(0, appointments.length - 1);
      setTableData(allAppointmentsExcludingLastOne);
      if (appointments.length > 0) {
        const lastAppointmentDate = new Date(appointments[appointments.length - 1].date);
        setLastDate(lastAppointmentDate);
      }
    }
  }, [appointments, status]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = async () => {
    const nextAppointmentDate = new Date();
    nextAppointmentDate.setDate(nextAppointmentDate.getDate() + Math.floor(Math.random() * 7) + 1);

    dispatch(AddAppointment({
      clinic,
      email,
      number,
      description,
      message,
      name,
      date: nextAppointmentDate.toISOString()
    }));

    setClinic('');
    setDescription('');
    setNumber(0);
    setEmail('');
    setMessage('');
    setName('');
  };

  const toggleContent = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  const weekdayString = lastDate.toLocaleDateString('en-US', { weekday: 'long' });
  const dateString = lastDate.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">Appointment</h1>
      <h2 className="text-xl font-bold my-4">Appointment reminder</h2>

      <div className="bg-white rounded-lg p-4 shadow-md mx-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-lg">{weekdayString}</p>
          <p className="text-black text-lg">{dateString}</p>
        </div>
      </div>

      <p className="ml-16 mt-5 text-gray-500 underline">Log for previous Eye Screening</p>

      <div className="bg-white rounded-lg p-4 shadow-md m-4">
        <div className="flex border-b border-gray-300 pb-2 mb-2">
          <p className="flex-1 text-center font-bold">Date</p>
          <p className="flex-1 text-center font-bold">Clinic</p>
          <p className="flex-1 text-center font-bold"></p>
        </div>
        {tableData.map((rowData, index) => (
          <div key={index}>
            <div className="flex border-b border-gray-300 pb-2 mb-2 items-center">
              <p className="flex-1 text-center">{new Date(rowData.date).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
              <p className="flex-1 text-center">{rowData.clinic}</p>
              <button className="flex-1 text-center" onClick={() => toggleContent(index + 1)}>
                {expandedIndex === index ? <IoChevronUp /> : <IoChevronDown />}
              </button>
            </div>
            {expandedIndex === index + 1 && (
              <div className="mt-2">
                <p>Result: {rowData.result}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl">Schedule Appointment</h2>
          <button onClick={toggleFormVisibility}>
            {isFormVisible ? <IoChevronUp /> : <IoChevronDown />}
          </button>
        </div>
        
        {isFormVisible && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <input
              className="border-2 border-gray-300 rounded-lg px-3 py-2 mb-4 block w-full"
              placeholder="Clinic"
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
            />
            <input
              className="border-2 border-gray-300 rounded-lg px-3 py-2 mb-4 block w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border-2 border-gray-300 rounded-lg px-3 py-2 mb-4 block w-full"
              placeholder="Number"
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
              type="tel"
            />
            <textarea
              className="border-2 border-gray-300 rounded-lg px-3 py-2 mb-4 block w-full resize-none"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <textarea
              className="border-2 border-gray-300 rounded-lg px-3 py-2 mb-4 block w-full resize-none"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
            <input
              className="border-2 border-gray-300 rounded-lg px-3 py-2 mb-4 block w-full"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className="text-red-600">Error: {error}</p>}
    </div>
  );
};

export default Appointment;
