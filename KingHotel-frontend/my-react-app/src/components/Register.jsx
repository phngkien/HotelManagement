import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../services/UserService';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await UserService.register(formData);
            if (data.statusCode === 200 || data.statusCode === 201) {
                setSuccessMessage('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration. Email might be already securely registered.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '80px auto', padding: '40px', backgroundColor: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--text-main)', fontSize: '32px' }}>Create an Account</h2>
            {error && <p style={{ color: '#c53030', textAlign: 'center', backgroundColor: '#fed7d7', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>{error}</p>}
            {successMessage && <p style={{ color: '#2f855a', textAlign: 'center', backgroundColor: '#c6f6d5', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>{successMessage}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-main)' }}>Full Name</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-main)' }}>Email Address</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-main)' }}>Phone Number</label>
                    <input 
                        type="text" 
                        name="phoneNumber"
                        value={formData.phoneNumber} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-main)' }}>Password</label>
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '16px' }}
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: '18px', marginTop: '10px' }}>
                    Complete Registration
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '25px', color: 'var(--text-muted)' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Log in here</Link>
            </p>
        </div>
    );
};

export default Register;
