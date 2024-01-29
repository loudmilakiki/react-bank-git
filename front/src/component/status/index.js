import "./index.css";
import React, { useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";

const Status = () => {
  const { authState } = useAuth();
  const { user } = authState || {};

  useEffect(() => {
    if (user) {
      console.log("User email updated:", user.email);
    }
  }, [user]);
  return <div className="status"></div>;
};
export default Status;
