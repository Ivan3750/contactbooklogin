// App.jsx
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ContactsPage from "./pages/ContactsPage";
import PrivateRoute from "./components/PrivateRoute";
import { getCurrentUser } from "./services/api";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setUser(userData);
        } catch (error) {
          console.error("Unauthorized", error);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navigation user={user} setUser={setUser} />
      <Routes>
        <Route path="/register" element={<RegisterPage setUser={setUser} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route
          path="/contacts"
          element={
            <PrivateRoute user={user}>
              <ContactsPage user={user} />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
