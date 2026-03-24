import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--text-main)',
            color: 'var(--text-light)',
            padding: '40px 0 20px 0',
            marginTop: 'auto' // pushes footer to bottom
        }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '15px', fontSize: '24px' }}>King Hotel Management</h3>
                <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Experience luxury and comfort in the heart of the city.</p>
                <div style={{ borderTop: '1px solid #4a5568', paddingTop: '20px', fontSize: '14px', color: '#a0aec0' }}>
                    &copy; {new Date().getFullYear()} King Hotel. All rights reserved. Designed for Excellence.
                </div>
            </div>
        </footer>
    );
};
export default Footer;
