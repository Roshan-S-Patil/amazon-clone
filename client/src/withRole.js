import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const withRole = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const role = useSelector((state) => state.user.currentUser.role);

    if (!allowedRoles.includes(role)) {
      return <Navigate to="/not-authorized" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withRole;