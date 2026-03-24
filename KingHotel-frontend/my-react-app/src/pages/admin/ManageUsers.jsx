import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await UserService.getAllUsers();
            setUsers(res.userList || []);
        } catch (err) {
            console.error(err);
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this user permanently from the system?')) return;
        setLoading(true);
        await UserService.deleteUser(id);
        fetchUsers();
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px' }}>Loading Users...</div>;

    return (
        <div>
            <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Manage Users</h2>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)' }}>
                        <tr>
                            <th style={{ padding: '15px' }}>ID</th>
                            <th style={{ padding: '15px' }}>Name</th>
                            <th style={{ padding: '15px' }}>Email</th>
                            <th style={{ padding: '15px' }}>Phone</th>
                            <th style={{ padding: '15px' }}>Role</th>
                            <th style={{ padding: '15px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '15px' }}>{u.id}</td>
                                <td style={{ padding: '15px', fontWeight: '600', color: 'var(--text-main)' }}>{u.name}</td>
                                <td style={{ padding: '15px' }}>{u.email}</td>
                                <td style={{ padding: '15px' }}>{u.phoneNumber || 'N/A'}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{ fontSize: '13px', padding: '4px 10px', borderRadius: '12px', fontWeight: '500', backgroundColor: u.role === 'ADMIN' ? '#c6f6d5' : '#e2e8f0', color: u.role === 'ADMIN' ? '#2f855a' : '#4a5568' }}>
                                        {u.role}
                                    </span>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <button onClick={() => handleDelete(u.id)} className="btn" style={{ backgroundColor: '#fed7d7', color: '#c53030', padding: '6px 12px', fontSize: '14px', fontWeight: '500' }} disabled={u.role === 'ADMIN'}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ManageUsers;
