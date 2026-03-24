import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const navStyle = ({ isActive }) => ({
        padding: '15px 20px',
        display: 'block',
        color: isActive ? 'var(--primary)' : 'var(--text-main)',
        backgroundColor: isActive ? 'var(--bg-color)' : 'transparent',
        borderRight: isActive ? '4px solid var(--primary)' : 'none',
        fontWeight: isActive ? '600' : '500',
        transition: 'all 0.2s',
        marginBottom: '5px',
        borderRadius: '0 8px 8px 0',
        textDecoration: 'none'
    });

    return (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', backgroundColor: 'white', boxShadow: 'var(--shadow-md)', zIndex: 1, padding: '30px 0' }}>
                <h3 style={{ padding: '0 20px', marginBottom: '30px', color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Dashboard Menu</h3>
                <nav style={{ paddingRight: '20px' }}>
                    <NavLink to="/admin/rooms" style={navStyle}>Manage Rooms</NavLink>
                    <NavLink to="/admin/bookings" style={navStyle}>Manage Bookings</NavLink>
                    <NavLink to="/admin/users" style={navStyle}>Manage Users</NavLink>
                </nav>
            </div>
            
            {/* Content Area */}
            <div style={{ flex: 1, padding: '40px', backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
