import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/home/HomePage';
import Login from './components/Login'; 
import Register from './components/Register';
import Profile from './pages/profile/Profile';
import Rooms from './pages/rooms/Rooms';
import RoomDetails from './pages/rooms/RoomDetails';
import AdminLayout from './pages/admin/AdminLayout';
import ManageRooms from './pages/admin/ManageRooms';
import ManageBookings from './pages/admin/ManageBookings';
import ManageUsers from './pages/admin/ManageUsers';
import UserService from './services/UserService';
import FindBooking from './pages/bookings/FindBooking';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setRole(localStorage.getItem('role'));
      // In a real app we might validate token here
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setRole(localStorage.getItem('role'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
  };

  if (loading) return null;

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar isAuthenticated={isAuthenticated} role={role} onLogout={handleLogout} />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Authentication */}
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/profile" /> : <Login onLoginSuccess={handleLoginSuccess} />
            } />
            
            <Route path="/register" element={ isAuthenticated ? <Navigate to="/profile" /> : <Register /> } />

            {/* Public Viewing */}
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:roomId" element={<RoomDetails />} />
            
            <Route path="/find-booking" element={<FindBooking />} />

            {/* Protected Routes */}
            <Route path="/profile" element={
              isAuthenticated ? <Profile onLogout={handleLogout} /> : <Navigate to="/login" />
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={ isAuthenticated && role === 'ADMIN' ? <AdminLayout /> : <Navigate to="/login" /> }>
                <Route index element={<Navigate to="rooms" />} />
                <Route path="rooms" element={<ManageRooms />} />
                <Route path="bookings" element={<ManageBookings />} />
                <Route path="users" element={<ManageUsers />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
