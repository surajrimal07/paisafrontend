import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";


export const AdminRoutes = () => {
  const user = JSON.parse(secureLocalStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || !user.isAdmin) {
      toast.error("Access Denied");
      navigate("/login");
    }
  }, [user, navigate]);

  return user != null && user.isAdmin ? <Outlet /> : null;
};
