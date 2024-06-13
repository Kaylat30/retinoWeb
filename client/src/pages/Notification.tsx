import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';
import splashImage from '../assets/splash.png';
import { GetAllAppointments } from '../slice/appointmentsSlice';
import { GetAllCheckups } from '../slice/checkupsSlice';
import { GetAllEyeScreenings } from '../slice/eyescreeningSlice';
import { updateNotificationCount } from '../slice/notificationSlice';

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

interface Checkup {
  _id: string;
  date: string;
  clinic?: string;
  glucose: number;
  hemoglobin?: number;
  urinalysis?: number;
}

interface EyeScreening {
  _id: string;
  date: string;
  clinic?: string;
  risk?: number;
  visual?: number;
  intraocular?: number;
  serum?: number;
}

interface NotificationItem {
  id: number;
  image: string;
  title: string;
  message: string;
  timestamp: string;
  unread: boolean;
  type: string;
}

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const getTimeDifference = (dateString: string) => {
    const appointmentDate = new Date(dateString);
    const currentTime = new Date();
    const difference = Math.abs(currentTime.getTime() - appointmentDate.getTime());
    const hours = Math.floor(difference / (1000 * 60 * 60));
    return `${hours} hours ago`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsAction = await dispatch(GetAllAppointments());
        const eyeScreeningsAction = await dispatch(GetAllEyeScreenings());
        const checkupsAction = await dispatch(GetAllCheckups());

        const appointments: Appointment[] = Array.isArray(appointmentsAction.payload)
        ? appointmentsAction.payload
        : [];
        const eyeScreenings: EyeScreening[] = Array.isArray(eyeScreeningsAction.payload)
        ? eyeScreeningsAction.payload
        : [];
        const checkups: Checkup[] = Array.isArray(checkupsAction.payload)
          ? checkupsAction.payload
          : [];

        const transformedAppointments = appointments.length > 0 ? [{
          id: 1,
          image: splashImage,
          title: 'New Appointment',
          message: `You have an appointment on ${new Date(appointments[appointments.length - 1].date).toLocaleDateString('en-US')} at ${appointments[appointments.length - 1].clinic}`,
          timestamp: getTimeDifference(appointments[appointments.length - 1].date),
          unread: true,
          type: 'appointment',
        }] : [];

        const transformedEyeScreenings = eyeScreenings.length > 0 ? [{
          id: 2,
          image: splashImage,
          title: 'New Eye Screening Schedule',
          message: `You have an eye screening scheduled on ${new Date(eyeScreenings[eyeScreenings.length - 1].date).toLocaleDateString('en-US')}`,
          timestamp: getTimeDifference(eyeScreenings[eyeScreenings.length - 1].date),
          unread: true,
          type: 'eyeScreening',
        }] : [];

        const transformedCheckups = checkups.length > 0 ? [{
          id: 3,
          image: splashImage,
          title: 'New Diabetes Appointment Schedule',
          message: `You have a diabetes checkup scheduled on ${new Date(checkups[checkups.length - 1].date).toLocaleDateString('en-US')}`,
          timestamp: getTimeDifference(checkups[checkups.length - 1].date),
          unread: true,
          type: 'checkup',
        }] : [];

        const allNotifications = [...transformedAppointments, ...transformedEyeScreenings, ...transformedCheckups];
        setNotifications(allNotifications);
        dispatch(updateNotificationCount(allNotifications.length));
      } catch (error ) {
        if (error instanceof Error) {
            console.error('Error fetching data:', error.message);
            throw error;
        }
      }
    };

    fetchData();
  }, [dispatch]);

  const handleNotificationPress = (notification: NotificationItem) => {
    const updatedNotifications = notifications.map((item) =>
      item.id === notification.id ? { ...item, unread: false } : item
    );
    setNotifications(updatedNotifications);

    navigate(`/notification/${notification.id}`); 
  };

  return (
    <div className="flex-1">
      {notifications.map((item) => (
        <div
          key={item.id}
          className={`flex-row p-4 border-b border-gray-300 ${item.unread ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => handleNotificationPress(item)}
          style={{ cursor: 'pointer' }}
        >
          <div className="w-40 h-40 rounded-full overflow-hidden mr-4">
            <img src={item.image} alt="Notification" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold mb-2">{item.title}</p>
            <p className="text-base mb-2">{item.message}</p>
            <p className="text-sm text-gray-600">{item.timestamp}</p>
          </div>
          {item.unread && (
            <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-red-500 w-4 h-4 rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Notification;

