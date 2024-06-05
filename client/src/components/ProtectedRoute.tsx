import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../store';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location,message:"You must Login in First" }} replace />;
  }

  return children;
};

export default ProtectedRoute;
