import React from 'react';
import AdminDashboard from '../../AdminDashboard/AdminDashboard.jsx';
import Dulo from '../../Footer/Dulo.jsx'
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <AdminDashboard/>
      <Dulo/>
    </div>
  );
};

export default Admin;
