import React, { useState, useEffect } from 'react';
import RoomService from '../../services/RoomService';

const ManageRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form State
    const [showForm, setShowForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({ id: null, roomType: '', roomPrice: '', roomDescription: '', photo: null });
    const [message, setMessage] = useState('');

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const res = await RoomService.getAllRooms();
            setRooms(res.roomList || []);
        } catch (err) {
            setMessage('Failed to fetch rooms: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRooms(); }, []);

    const handleFormChange = (e) => {
        if (e.target.name === 'photo') {
            setFormData({ ...formData, photo: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            if (isEditMode) {
                await RoomService.updateRoom(formData.id, formData.photo, formData.roomType, formData.roomPrice);
                setMessage('Room updated successfully!');
            } else {
                await RoomService.addNewRoom(formData.photo, formData.roomType, formData.roomPrice, formData.roomDescription);
                setMessage('Room added successfully!');
            }
            setShowForm(false);
            fetchRooms();
        } catch (err) {
            setMessage('Error saving room: ' + (err.response?.data?.message || err.message));
            setLoading(false);
        }
    };

    const handleEdit = (room) => {
        setFormData({ id: room.id, roomType: room.roomType, roomPrice: room.roomPrice, roomDescription: room.roomDescription, photo: null });
        setIsEditMode(true);
        setShowForm(true);
        setMessage('');
    };

    const handleDelete = async (roomId) => {
        if (!window.confirm('Delete this room permanently?')) return;
        setLoading(true);
        try {
            await RoomService.deleteRoom(roomId);
            fetchRooms();
        } catch (err) {
            setMessage('Error deleting room.');
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '32px' }}>Manage Rooms</h2>
                <button onClick={() => { setShowForm(!showForm); setIsEditMode(false); setFormData({ id: null, roomType: '', roomPrice: '', roomDescription: '', photo: null }); setMessage(''); }} className="btn btn-primary">
                    {showForm ? 'Close Form' : '+ Add New Room'}
                </button>
            </div>

            {message && <div style={{ padding: '15px', marginBottom: '20px', borderRadius: '8px', backgroundColor: message.includes('success') ? '#c6f6d5' : '#fed7d7', color: message.includes('success') ? '#2f855a' : '#c53030' }}>{message}</div>}

            {showForm && (
                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-md)', marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>{isEditMode ? 'Edit Existing Room' : 'Add a New Room'}</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Room Type</label>
                                <select name="roomType" value={formData.roomType} onChange={handleFormChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', backgroundColor: 'white' }}>
                                    <option value="" disabled>Select Room Type...</option>
                                    <option value="Single">Single</option>
                                    <option value="Double">Double</option>
                                    <option value="Family Room">Family Room</option>
                                    <option value="Suite">Suite</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Price Per Night ($)</label>
                                <input type="number" name="roomPrice" value={formData.roomPrice} onChange={handleFormChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }} />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Room Description</label>
                            <textarea name="roomDescription" value={formData.roomDescription} onChange={handleFormChange} required rows="4" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', resize: 'vertical' }}></textarea>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Upload Photo {isEditMode && '(Leave empty to keep current)'}</label>
                            <input type="file" name="photo" onChange={handleFormChange} required={!isEditMode} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', backgroundColor: 'var(--bg-color)' }} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ padding: '15px', fontSize: '18px', marginTop: '10px' }}>
                            {isEditMode ? 'Save Changes' : 'Create Room'}
                        </button>
                    </form>
                </div>
            )}

            {loading ? <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px' }}>Loading Data...</div> : (
                <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)' }}>
                            <tr>
                                <th style={{ padding: '15px' }}>Photo</th>
                                <th style={{ padding: '15px' }}>Type</th>
                                <th style={{ padding: '15px' }}>Price</th>
                                <th style={{ padding: '15px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.length === 0 ? (
                                <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>No rooms added yet.</td></tr>
                            ) : rooms.map(r => (
                                <tr key={r.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ width: '80px', height: '60px', borderRadius: '6px', backgroundImage: `url(${r.roomPhotoUrl ? (r.roomPhotoUrl.startsWith('http') ? r.roomPhotoUrl : 'http://localhost:8080/uploads/' + r.roomPhotoUrl) : ''})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#e2e8f0' }}></div>
                                    </td>
                                    <td style={{ padding: '15px', fontWeight: '600' }}>{r.roomType}</td>
                                    <td style={{ padding: '15px', color: 'var(--primary)', fontWeight: 'bold' }}>${r.roomPrice}</td>
                                    <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                                        <button onClick={() => handleEdit(r)} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '14px' }}>Edit</button>
                                        <button onClick={() => handleDelete(r.id)} className="btn" style={{ backgroundColor: '#fed7d7', color: '#c53030', padding: '6px 12px', fontSize: '14px', border: 'none' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
export default ManageRooms;
