import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import Navigation from './components/Navigation';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import PrivateRoute from './components/PrivateRoute';
import { getCurrentUser } from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser(token);
        setUser(userData);
      } catch (error) {
        console.error('помилка', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Завантаження...</p>
      </div>
    );
  }

  return (
    <>
      <Navigation user={user} setUser={setUser} />
      <Routes>
        <Route path="/register" element={
            <PublicRoute user={user}>
              <RegisterPage setUser={setUser} />
            </PublicRoute>}
        />
        <Route path="/login" element={
            <PublicRoute user={user}>
              <LoginPage setUser={setUser} />
            </PublicRoute>
          }
        />
        <Route path="/contacts" element={
            <PrivateRoute user={user}>
              <ContactsPage user={user} />
            </PrivateRoute>
          }
        />
        <Route path="/" element={
            user ? (<Navigate to="/contacts" replace />) : 
            (<Navigate to="/login" replace />)
          }
        />
      </Routes>
    </>
  );
}
export default App;
