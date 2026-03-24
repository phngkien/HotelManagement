import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const Profile = ({ onLogout }) => {
    const [profile, setProfile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await UserService.getLoggedInUserProfile();
                setProfile(data.user);
                
                if (data.user?.id) {
                    try {
                        const res = await UserService.getUserBookingHistory(data.user.id);
                        setBookings(res.user?.bookings || []);
                    } catch (err) {
                        setError('Failed to load booking history.');
                        console.error('Failed to fetch bookings:', err);
                    }
                }
            } catch (err) {
                setError('Failed to securely fetch profile information. Your session might have expired.');
                if (err.response?.status === 401 || err.response?.status === 403) {
                    onLogout();
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [navigate, onLogout]);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '20px' }}>Loading profile data...</div>;

    if (error) return <div style={{ textAlign: 'center', marginTop: '100px', color: 'red', fontSize: '18px' }}>{error}</div>;

    return (
        <div className="container" style={{ padding: '60px 0', maxWidth: '800px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '30px', textAlign: 'center' }}>My Dashboard</h2>
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #e2e8f0', paddingBottom: '30px' }}>
                    <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 'bold', marginRight: '25px', boxShadow: 'var(--shadow-sm)' }}>
                        {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '32px', color: 'var(--text-main)', marginBottom: '5px' }}>{profile?.name}</h2>
                        <span style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)', padding: '5px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '500', display: 'inline-block' }}>
                            {profile?.role === 'ADMIN' ? 'Administrator Account' : 'Guest Member'}
                        </span>
                    </div>
                </div>

                <h3 style={{ fontSize: '22px', marginBottom: '20px', color: 'var(--text-main)' }}>Personal Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                    <div style={{ padding: '20px', backgroundColor: 'var(--bg-color)', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</p>
                        <p style={{ fontWeight: '500', fontSize: '18px', color: 'var(--text-main)' }}>{profile?.email}</p>
                    </div>
                    <div style={{ padding: '20px', backgroundColor: 'var(--bg-color)', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone Number</p>
                        <p style={{ fontWeight: '500', fontSize: '18px', color: 'var(--text-main)' }}>{profile?.phoneNumber || 'Not provided'}</p>
                    </div>
                </div>

                <div style={{ marginTop: '40px', borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '20px', color: 'var(--text-main)' }}>My Booking History</h3>
                    
                    {bookings.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: 'var(--bg-color)', borderRadius: '12px', border: '1px dashed #cbd5e0' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>You have no bookings yet. Explore our rooms to plan your next stay!</p>
                            <button onClick={() => navigate('/rooms')} className="btn btn-primary" style={{ marginTop: '15px' }}>Explore Rooms</button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '20px' }}>
                            {bookings.map(booking => (
                                <div key={booking.id} style={{ display: 'flex', flexDirection: 'column', padding: '20px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '15px' }}>
                                        <div>
                                            <span style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Confirmation Code</span>
                                            <p style={{ fontWeight: 'bold', fontSize: '18px', color: 'var(--primary)' }}>{booking.bookingConfirmationCode}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Guests</span>
                                            <p style={{ fontWeight: '500', fontSize: '16px' }}>{booking.totalNumOfGuests} ({booking.numOfAdults} Adults, {booking.numOfChildren} Children)</p>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <span style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Check-in</span>
                                            <p style={{ fontWeight: '500', fontSize: '16px' }}>{booking.checkInDate}</p>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Check-out</span>
                                            <p style={{ fontWeight: '500', fontSize: '16px' }}>{booking.checkOutDate}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
