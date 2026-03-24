import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, role, onLogout }) => {
    const navigate = useNavigate();

    return (
        <nav style={{
            backgroundColor: 'var(--nav-bg)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '0 20px'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '80px'
            }}>
                {/* Logo */}
                <Link to="/" style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary)', letterSpacing: '1px' }}>
                    KING<span style={{ color: 'var(--text-main)', fontWeight: '500' }}>HOTEL</span>
                </Link>

                {/* Nav Links */}
                <ul style={{ display: 'flex', gap: '30px', fontWeight: '500', fontSize: '16px' }}>
                    <li><Link to="/rooms" style={{ color: 'var(--text-main)' }}>Rooms</Link></li>
                    <li><Link to="/find-booking" style={{ color: 'var(--text-main)' }}>Find My Booking</Link></li>
                </ul>

                {/* Auth Buttons */}
                <div style={{ display: 'flex', gap: '15px' }}>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    ) : (
                        <>
                            {role === 'ADMIN' && (
                                <Link to="/admin" className="btn btn-outline">Admin Dashboard</Link>
                            )}
                            <Link to="/profile" className="btn btn-outline">Profile</Link>
                            <button onClick={() => { onLogout(); navigate('/'); }} className="btn btn-primary">Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
