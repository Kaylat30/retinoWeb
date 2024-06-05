import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { selectUser, logout, selectSessionExpiresAt } from './slice/userSlice';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Insights from './pages/Insights';
import AddLayout from './components/AddLayout';
import AppointmentForm from './pages/ApppointmentForm';
import CheckupForm from './pages/CheckupForm';
import EyescreeningForm from './pages/EyescreeningForm';
import EyeLayout from './components/EyeLayout';
import Appointment from './pages/Appointment';
import Checkup from './pages/Checkup';
import EyeScreening from './pages/EyeScreening';
import Nutrition from './pages/Nutrition';
import Education from './pages/Education';
import Educinfo from './pages/Educinfo';
import Blog from './pages/Blog';
import BlogInfo from './pages/BlogInfo';
import Notification from './pages/Notification';
import NotificationInfo from './pages/NotificationInfo';
import Error from './components/Error';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="insight" element={<ProtectedRoute element={<Insights />} />} />
      <Route path="add" element={<ProtectedRoute element={<AddLayout />} />}>
        <Route index element={<AppointmentForm />} />
        <Route path="checkupform" element={<CheckupForm />} />
        <Route path="eyescreeningform" element={<EyescreeningForm />} />
      </Route>
      <Route path="eye" element={<ProtectedRoute element={<EyeLayout />} />}>
        <Route index element={<Appointment />} />
        <Route path="checkup" element={<Checkup />} />
        <Route path="eyescreening" element={<EyeScreening />} />
      </Route>
      <Route path="nutrition" element={<ProtectedRoute element={<Nutrition />} />} />
      <Route path="education" element={<Education />} />
      <Route path="education/:text" element={<Educinfo />} />
      <Route path="blog" element={<Blog />} />
      <Route path="blog/:id" element={<BlogInfo />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="notification" element={<ProtectedRoute element={<Notification />} />} />
      <Route path="notification/:id" element={<ProtectedRoute element={<NotificationInfo />} />} />
    </Route>
  )
);

function App(): JSX.Element {
  const dispatch = useDispatch();
  const sessionExpiresAt = useSelector(selectSessionExpiresAt);
  //const user = useSelector(selectUser);

  useEffect(() => {
    const checkSessionExpiry = () => {
      if (sessionExpiresAt && Date.now() > sessionExpiresAt) {
        dispatch(logout());
      }
    };

    const intervalId = setInterval(checkSessionExpiry, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, sessionExpiresAt]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

function ProtectedRoute({ element }: { element: JSX.Element }): JSX.Element {
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
}
