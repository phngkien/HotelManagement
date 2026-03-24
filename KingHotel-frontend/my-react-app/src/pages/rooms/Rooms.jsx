import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RoomService from '../../services/RoomService';

const Rooms = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    
    // Filters
    const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '');
    const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
    const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStandardData = async () => {
            try {
                // Pre-fetch room types
                const types = await RoomService.getRoomTypes();
                setRoomTypes(types || []);

                const urlCheckIn = searchParams.get('checkIn');
                const urlCheckOut = searchParams.get('checkOut');
                const urlType = searchParams.get('type');

                // If dates are provided, search availability. Else show all rooms.
                if (urlCheckIn && urlCheckOut) {
                    const res = await RoomService.getAvailableRoomsByDateAndType(urlCheckIn, urlCheckOut, urlType || 'Any');
                    setRooms(res.roomList || []);
                } else {
                    const res = await RoomService.getAllRooms();
                    let allRooms = res.roomList || [];
                    if (urlType && urlType !== 'Any Type' && urlType !== '') {
                        allRooms = allRooms.filter(room => room.roomType === urlType);
                    }
                    setRooms(allRooms);
                }
            } catch (err) {
                setError('Error fetching rooms: ' + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };

        fetchStandardData();
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        navigate(`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&type=${selectedType}`);
    };

    const handleShowAll = () => {
        setCheckIn('');
        setCheckOut('');
        setSelectedType('');
        setLoading(true);
        navigate('/rooms');
    };

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '40px' }}>Discover Our Rooms</h2>
            
            {/* Filter Bar */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow-md)', marginBottom: '40px' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>Check-in</label>
                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>Check-out</label>
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>Room Type</label>
                        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', backgroundColor: 'white' }}>
                            <option value="">Any Type</option>
                            {roomTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '10px 30px' }}>Availability</button>
                    <button type="button" onClick={handleShowAll} className="btn btn-outline" style={{ padding: '10px 30px' }}>Show All</button>
                </form>
            </div>

            {/* Room Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px', fontSize: '20px' }}>Loading rooms...</div>
            ) : error ? (
                <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>{error}</div>
            ) : rooms.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: 'var(--text-muted)' }}>No rooms found matching your criteria.</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                    {rooms.map(room => (
                        <div key={room.id} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s', cursor: 'pointer' }} onClick={() => navigate(`/rooms/${room.id}`)}>
                            <div style={{ height: '220px', backgroundColor: '#e2e8f0', backgroundImage: `url(${room.roomPhotoUrl?.startsWith('http') ? room.roomPhotoUrl : 'http://localhost:8080/uploads/' + room.roomPhotoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <div style={{ padding: '25px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <h3 style={{ fontSize: '22px', margin: 0 }}>{room.roomType}</h3>
                                    <span style={{ backgroundColor: 'rgba(205, 164, 52, 0.1)', color: 'var(--primary)', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                                        ${room.roomPrice} / night
                                    </span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.5', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {room.roomDescription || "A beautiful room with excellent amenities perfect for your stay."}
                                </p>
                                <button className="btn btn-outline" style={{ width: '100%' }}>View & Book</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Rooms;
