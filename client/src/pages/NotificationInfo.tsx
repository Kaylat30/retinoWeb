import { useSelector } from 'react-redux';
//import { AppDispatch } from '../store'; 
import { useNavigate, useParams } from 'react-router-dom';
import { selectNotificationById } from '../slice/notificationSlice';
import { IoChevronBack } from 'react-icons/io5';

const NotificationInfo = () => {
  //const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const { notificationId } = useParams<{ notificationId: string }>();
  const notification = useSelector(selectNotificationById(notificationId || ''));

  const handleGoBack = () => {
    navigate('/notifications')
  };

  if (!notification) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <button className="text-black" onClick={handleGoBack}>
          <IoChevronBack />
        </button>
      </div>
      <div className="justify-center mx-4">
        <div className="flex items-center mb-4">
          <img
            src={notification.image}
            alt="Notification"
            className="w-20 h-20 rounded-full overflow-hidden"
          />
          <h1 className="text-xl font-bold ml-4 mb-2">{notification.title}</h1>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-sm text-gray-600">{(new Date(notification.timestamp), 'dd MMM yyyy HH:mm')}</p>
        </div>
        <p>{notification.message}</p>
      </div>
    </div>
  );
};

export default NotificationInfo;
