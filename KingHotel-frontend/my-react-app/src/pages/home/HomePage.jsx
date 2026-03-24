import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bannerImg from '../../assets/hotel.jpg';


const HomePage = () => {
    const navigate = useNavigate();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [roomType, setRoomType] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&type=${roomType}`);
    };

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                height: '80vh',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${bannerImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px'
            }}>
                <h1 style={{ fontSize: '4.5rem', marginBottom: '20px', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', letterSpacing: '2px' }}>Welcome to King Hotel</h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '50px', maxWidth: '800px', fontWeight: '300' }}>
                    Discover the perfect balance of luxury and comfort for your next stay. 
                </p>

                {/* Quick Search Widget */}
                <div style={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow-lg)',
                    maxWidth: '1000px',
                    width: '100%'
                }}>
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '600', textAlign: 'left' }}>Check-in Date</label>
                            <input 
                                type="date" 
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                style={{ width: '100%', padding: '14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '16px', color: 'var(--text-main)' }} 
                            />
                        </div>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '600', textAlign: 'left' }}>Check-out Date</label>
                            <input 
                                type="date" 
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                style={{ width: '100%', padding: '14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '16px', color: 'var(--text-main)' }} 
                            />
                        </div>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '600', textAlign: 'left' }}>Room Type</label>
                            <select 
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                style={{ width: '100%', padding: '14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '16px', backgroundColor: 'white', color: 'var(--text-main)' }}
                            >
                                <option value="">Any Type</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Suite">Suite</option>
                                <option value="Family">Family Room</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '18px', height: '53px' }}>Explore Rooms</button>
                    </form>
                </div>
            </section>

            {/* Features Section */}
            <section className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '60px', position: 'relative', display: 'inline-block' }}>
                    Premium Amenities
                    <div style={{ position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '3px', backgroundColor: 'var(--primary)' }}></div>
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    <div style={{ padding: '40px 30px', backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-md)', transition: 'var(--transition)' }} className="feature-card">
                        <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🏊‍♂️</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Infinity Pool</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Relax and unwind at our rooftop infinity pool with a panoramic view of the entire city skyline.</p>
                    </div>
                    
                    <div style={{ padding: '40px 30px', backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-md)', transition: 'var(--transition)' }} className="feature-card">
                        <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🍽️</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Fine Dining</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Experience world-class cuisine made by Michelin-starred chefs covering both local and international dishes.</p>
                    </div>
                    
                    <div style={{ padding: '40px 30px', backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-md)', transition: 'var(--transition)' }} className="feature-card">
                        <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>💆‍♀️</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Spa & Wellness</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Rejuvenate your body and soul in our premium spa utilizing traditional and modern therapies.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
