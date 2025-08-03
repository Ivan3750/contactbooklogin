import React from "react";
import PropTypes from "prop-types";
import { logoutUser } from "../services/api";

const UserMenu = ({ email, setUser }) => {
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await logoutUser(token);
    } catch (error) {
      console.error("Помилка", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <div>
      <p>{email}</p>
      <button onClick={handleLogout}>Вийти</button>
    </div>
  );
};


export default UserMenu;