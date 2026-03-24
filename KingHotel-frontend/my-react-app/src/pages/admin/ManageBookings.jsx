import React, { useState, useEffect } from 'react';
import BookingService from '../../services/BookingService';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await BookingService.getAllBookings();
            setBookings(res.bookingList || []);
        } catch (err) {
            console.error(err);
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchBookings(); }, []);

    const handleCancel = async (id) => {
        if (!window.confirm('Delete/Cancel this booking permanently?')) return;
        setLoading(true);
        await BookingService.cancelBooking(id);
        fetchBookings();
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px' }}>Loading Bookings...</div>;

    return (
        <div>
            <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Manage Bookings</h2>
            {bookings.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>No bookings found in the system.</p>
                </div>
            ) : (
                <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)' }}>
                            <tr>
                                <th style={{ padding: '15px' }}>Confirmation Code</th>
                                <th style={{ padding: '15px' }}>Check-In</th>
                                <th style={{ padding: '15px' }}>Check-Out</th>
                                <th style={{ padding: '15px' }}>Guests</th>
                                <th style={{ padding: '15px' }}>Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '15px', fontWeight: 'bold', color: 'var(--primary)' }}>{b.bookingConfirmationCode}</td>
                                    <td style={{ padding: '15px' }}>{b.checkInDate}</td>
                                    <td style={{ padding: '15px' }}>{b.checkOutDate}</td>
                                    <td style={{ padding: '15px' }}>{b.totalNumOfGuests}</td>
                                    <td style={{ padding: '15px' }}>
                                        <button onClick={() => handleCancel(b.id)} className="btn" style={{ backgroundColor: '#fed7d7', color: '#c53030', padding: '6px 12px', fontSize: '14px', fontWeight: '500' }}>Cancel</button>
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
export default ManageBookings;
