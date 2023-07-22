import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const AuthGuard = ({ element: Element, ...rest }) => {
  if (!isAuthenticated()) return (<Navigate to="/login" replace />);
  return (
    <Element {...rest} />
  );
};

export default AuthGuard;
