import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const role=useSelector(state=>state.user.role)

  return (
    <Route {...rest} render={(props) => {
      if (!role) { //instead of role there will be user
        return <Navigate to='/login' />;
      }

      if (roles && !roles.includes(role)) {//instead of role there will be user.role
        return <Navigate to='/' />;
      }

      return <Component {...props} />;
    }} />
  );
};

export default ProtectedRoute;