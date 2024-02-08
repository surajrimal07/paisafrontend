import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      toast.error('Please login to continue', {
        position: 'top-right',
        autoClose: 5000,
      });
      navigate('/login');
    }
  }, [user, navigate]);

  return <Outlet />;
};
