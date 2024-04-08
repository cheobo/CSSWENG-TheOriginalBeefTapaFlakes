import React, { useState } from 'react';
import './CreateAdmin.css';

const CreateAdmin = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/createadmin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password })
            });

            if (response.status === 400) {
                alert('Email or username is already registered');
            } else if (response.status === 201) {
                // Logout the current session by clearing the local storage
                localStorage.removeItem('jwt'); // Assuming 'jwt' is your token's key

                // Optionally, show a success message or alert before redirecting
                alert('Admin account created successfully. You will be redirected to the login page.');
                
                // Redirect to login page after a delay
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000); // 2000 milliseconds delay (2 seconds)
            }
        } catch (error) {
            console.error('Error creating admin:', error);
        }
    };

    return (
        <div className="admin-register-container">
            <div className="admin-form-container">
                <h2>CREATE YOUR ADMIN ACCOUNT</h2>
                <form onSubmit={handleSubmit}>
                    <div className="admin-register-input-group">
                        <label htmlFor="email">Email Address *</label>
                        <input type="email" className="admin-register-input-field" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    {emailError && <p className="admin-error-message">{emailError}</p>}
                    <div className="admin-register-input-group">
                        <label htmlFor="username">Username *</label>
                        <input type="username" className="admin-register-input-field" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="admin-register-input-group">
                        <label htmlFor="password">Password *</label>
                        <input type="password" className="admin-register-input-field" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="admin-register-input-group">
                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        <input type="password" className="admin-register-input-field" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="admin-register-button">CREATE ADMIN ACCOUNT</button>
                    <a href="/login" className="admin-login">Already have an account?</a>
                </form>
            </div>
        </div>
    );
};

export default CreateAdmin;
