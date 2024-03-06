import React from 'react';
import './AdminDashboard.css';

function AdminDashboard({ isAdmin }) {
    if (!isAdmin) {
        return <p>Access denied. You must be an admin to view this page.</p>;
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <div className="admin-actions">
                    <button className="btn-add-new">+ New</button>
                </div>
            </div>
            <div className="admin-content">
                {/* Content goes here */}
            </div>
        </div>
    );
}

export default AdminDashboard;
