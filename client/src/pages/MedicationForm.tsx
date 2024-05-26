// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateAppointment, updateCheckup, updateEyeScreening } from '../api';
// //import { addCheckup, addEyeScreening } from '../slice/recordsSlice';
// import { addAppointment, getAllAppointments, getAllCheckups, getAllEyeScreenings } from '../slice/appointmentsSlice';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import nutritionSlice from '../slice/nutritionSlice';

// function MedicationForm() {

//   interface RootState {
//     appointments: {
//       id: string;
//     };
//     nutrition: {
//       id: string;
//       food: string;
//       date: string;
//     };
    
//   }
//   // Redux store selectors
//   const appointments = useSelector((state: RootState) => state.appointments);
//   const eyescreenings = useSelector((state: RootState) => state.eyescreenings);
//   const checkups = useSelector((state: RootState) => state.checkups);

//   // Redux store dispatch
//   const dispatch = useDispatch();

//   // Component state
//   //const [cat, setCat] = useState('');
//   const [date, setDate] = useState('');
//   const [clinic, setClinic] = useState('');
//   const [result, setResult] = useState('');
//   const [risk, setRisk] = useState('');
//   const [visual, setVisual] = useState('');
//   const [intraocular, setIntraocular] = useState('');
//   const [serum, setSerum] = useState('');
//   const [glucose, setGlucose] = useState('');
//   const [hemoglobin, setHemoglobin] = useState('');
//   const [urinalysis, setUrinalysis] = useState('');

//   useEffect(() => {
//     dispatch(getAllAppointments());
//     dispatch(getAllCheckups());
//     dispatch(getAllEyeScreenings());
//   }, [dispatch]);

//   const handleSave = async () => {
//     try {
//       const [day, month, year] = date.split('/').map(part => parseInt(part));
//       const parsedDate = new Date(year, month - 1, day);

//       if (cat === "appointment") {
//         const response = await updateAppointment(appointments[appointments.length - 1]._id, result);
//         if (response) {
//           toast.success('Appointment details added successfully');
//         }
//       } else if (cat === "checkup") {
//         const update = await updateCheckup(checkups[checkups.length - 1]._id, clinic, glucose, hemoglobin, urinalysis);
//         if (update) {
//           toast.success('Checkup details added successfully');
//         }
//       } else if (cat === "eyescreening") {
//         const update = await updateEyeScreening(eyescreenings[eyescreenings.length - 1]._id, clinic, visual, intraocular, serum, risk);
//         if (update) {
//           toast.success('Eyescreening details added successfully');
//         }
//       }

//       setDate('');
//       setClinic('');
//       setResult('');
//       setRisk('');
//       setVisual('');
//       setIntraocular('');
//       setSerum('');
//       setGlucose('');
//       setHemoglobin('');
//       setUrinalysis('');
//     } catch (error) {
//       console.error('Error adding record:', error.message);
//       toast.error(`Adding details Failed: ${error.message}`);
//     }
//   };

//   // Remaining code for rendering Medication form

//   return (
//     <div>
//       {/* Render Medication form UI */}
//     </div>
//   );
// }

// export default MedicationForm;


export default function MedicationForm() {
  return (
    <div>
      Medication section
    </div>
  )
}

