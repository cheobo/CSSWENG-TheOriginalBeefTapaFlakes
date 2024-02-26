import React, { useState } from 'react';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password })
            });

            if(response.status === 201)
                redirectTo('/login');

            if(response.status === 400)
                alert('Email or username is already registered');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="register-container">
            <div className="form-container">
                <h2>CREATE YOUR ACCOUNT</h2>
                <form onSubmit={handleSubmit}>
                    <div className="register-input-group">
                        <label htmlFor="email">Email Address *</label>
                        <input type="email" className="register-input-field" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="username">Username *</label>
                        <input type="username" className="register-input-field" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="password">Password *</label>
                        <input type="password" className="register-input-field" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        <input type="password" className="register-input-field" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="register-button">CREATE ACCOUNT</button>
                    <a href="/login" className="login">Already have an account?</a>
                </form>
            </div>
        </div>
    );
};

const redirectTo = (route) => {
    window.location.href = route;
};

export default Register;
