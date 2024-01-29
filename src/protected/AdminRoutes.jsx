import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


export const AdminRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || !user.isAdmin) {
        toast.error('Access Denied');
      navigate('/login');
    }
  }, [user, navigate]);

  <ToastContainer position="top-right" />
  return user != null && user.isAdmin ? <Outlet /> : null;
};
