import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/isloggedin",
        { withCredentials: true }
      );

      if (res.status === 200) {
        setIsAuth(true);
      }
    } catch {
      setIsAuth(false);
    }
  };

  if (isAuth === null) {
    return <div className="text-white">Checking auth...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
