import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [notesData, setNotesData] = useState([
        { id: 1, productName: 'Sub-Reseller Package A', currentInventory: 10 },
        { id: 2, productName: 'Sub-Reseller Package B', currentInventory: 10 },
        { id: 3, productName: 'Reseller Package A', currentInventory: 10 },
        { id: 4, productName: 'Reseller Package B', currentInventory: 10 }
    ]);

    const addNewProduct = () => {
        const newId = notesData.reduce((max, p) => p.id > max ? p.id : max, notesData[0].id) + 1;

        const newProduct = {
            id: newId,
            productName: `New Product ${newId}`,
            currentInventory: 0,
        };

        setNotesData([...notesData, newProduct]);
    };

    const navigateToProduct = (url) => {
        window.location.href = url;
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-table-container">
                <h1 className="dashboard-title">Admin Dashboard</h1>
                <button onClick={addNewProduct} className="new-product-btn">+ New</button>
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Current Inventory</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notesData.map((note, index) => (
                            <tr key={note.id}>
                                <td>
                                    {note.productName}
                                    <button 
                                        className="open-product-btn" 
                                        style={{ float: 'right' }}
                                        onClick={() => navigateToProduct(`/product${index < 2 ? '1' : '2'}`)}
                                    >
                                        OPEN
                                    </button>
                                </td>
                                <td>{note.currentInventory}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
