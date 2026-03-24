import React, { useState } from 'react';
import BookingService from '../../services/BookingService';

const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!confirmationCode.trim()) return;
        
        setLoading(true);
        setError('');
        setBooking(null);
        
        try {
            const res = await BookingService.getBookingByConfirmationCode(confirmationCode);
            if (res.booking) {
                setBooking(res.booking);
            } else {
                setError('Booking not found with this code.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error finding booking.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '30px', textAlign: 'center' }}>Find My Booking</h2>
            
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                <input 
                    type="text" 
                    value={confirmationCode} 
                    onChange={(e) => setConfirmationCode(e.target.value)} 
                    placeholder="Enter Booking Confirmation Code" 
                    required 
                    style={{ flex: 1, padding: '15px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '16px' }}
                />
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0 30px' }}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <div style={{ padding: '15px', backgroundColor: '#fed7d7', color: '#c53030', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

            {booking && (
                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                    <h3 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--primary)' }}>Booking Status: Confirmed</h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '5px' }}>Confirmation Code</p>
                            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{booking.bookingConfirmationCode}</p>
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '5px' }}>Number Of Guests</p>
                            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{booking.totalNumOfGuests}</p>
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '5px' }}>Check-In Date</p>
                            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{booking.checkInDate}</p>
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '5px' }}>Check-Out Date</p>
                            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{booking.checkOutDate}</p>
                        </div>
                    </div>

                    {booking.room && (
                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div style={{ width: '120px', height: '80px', borderRadius: '8px', backgroundImage: `url(${booking.room.roomPhotoUrl ? (booking.room.roomPhotoUrl.startsWith('http') ? booking.room.roomPhotoUrl : 'http://localhost:8080/uploads/' + booking.room.roomPhotoUrl) : ''})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#e2e8f0' }}></div>
                            <div>
                                <h4 style={{ fontSize: '18px', margin: '0 0 5px 0' }}>{booking.room.roomType}</h4>
                                <p style={{ color: 'var(--primary)', fontWeight: 'bold', margin: 0 }}>${booking.room.roomPrice} / night</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FindBooking;
