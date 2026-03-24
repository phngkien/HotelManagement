import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoomService from '../../services/RoomService';
import BookingService from '../../services/BookingService';
import UserService from '../../services/UserService';

const RoomDetails = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numOfAdults, setNumOfAdults] = useState(1);
    const [numOfChildren, setNumOfChildren] = useState(0);
    
    const [bookingMessage, setBookingMessage] = useState('');

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await RoomService.getRoomById(roomId);
                setRoom(res.room);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch room details');
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
    }, [roomId]);

    const handleBookRoom = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setBookingMessage('Please log in first to book a room.');
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        try {
            const profileRes = await UserService.getLoggedInUserProfile();
            const userId = profileRes.user.id;

            const bookingRequest = {
                checkInDate,
                checkOutDate,
                numOfAdults,
                numOfChildren
            };

            const res = await BookingService.bookRoom(roomId, userId, bookingRequest);
            if (res.statusCode === 200 || res.statusCode === 201) {
                setBookingMessage(`Booking successful! Your confirmation code is: ${res.bookingConfirmationCode}`);
                setCheckInDate('');
                setCheckOutDate('');
                setNumOfAdults(1);
                setNumOfChildren(0);
            } else {
                setBookingMessage(res.message || 'Booking failed. Room might not be available.');
            }
        } catch (err) {
            setBookingMessage(err.response?.data?.message || 'An error occurred during booking.');
        }
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '20px' }}>Loading Room...</div>;
    if (error) return <div style={{ textAlign: 'center', marginTop: '100px', color: 'red', fontSize: '18px' }}>{error}</div>;
    if (!room) return <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '18px' }}>Room not found.</div>;

    return (
        <div className="container" style={{ padding: '40px 0', maxWidth: '1100px' }}>
            <button className="btn btn-outline" onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>&larr; Back to Rooms</button>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
                {/* Left Side: Room Info */}
                <div>
                    <img src={room.roomPhotoUrl ? (room.roomPhotoUrl.startsWith('http') ? room.roomPhotoUrl : 'http://localhost:8080/uploads/' + room.roomPhotoUrl) : "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80"} alt={room.roomType} style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)', marginBottom: '20px', objectFit: 'cover', height: '400px' }} />
                    <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>{room.roomType}</h2>
                    <p style={{ fontSize: '24px', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '20px' }}>${room.roomPrice} / night</p>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '16px' }}>{room.roomDescription}</p>
                </div>

                {/* Right Side: Booking Form */}
                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', alignSelf: 'start' }}>
                    <h3 style={{ fontSize: '24px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>Reserve This Room</h3>
                    
                    {bookingMessage && (
                        <div style={{ padding: '15px', marginBottom: '20px', borderRadius: '8px', backgroundColor: bookingMessage.includes('successful') ? '#c6f6d5' : '#fed7d7', color: bookingMessage.includes('successful') ? '#2f855a' : '#c53030' }}>
                            {bookingMessage}
                        </div>
                    )}

                    <form onSubmit={handleBookRoom} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Check-in Date</label>
                            <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Check-out Date</label>
                            <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} required min={checkInDate || new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Adults</label>
                                <input type="number" min="1" value={numOfAdults} onChange={(e) => setNumOfAdults(parseInt(e.target.value))} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Children</label>
                                <input type="number" min="0" value={numOfChildren} onChange={(e) => setNumOfChildren(parseInt(e.target.value))} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }} />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ padding: '15px', fontSize: '18px', marginTop: '15px', width: '100%' }}>Book Room Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
