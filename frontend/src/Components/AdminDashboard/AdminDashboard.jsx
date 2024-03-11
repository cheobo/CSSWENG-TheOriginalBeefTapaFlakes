import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import productsData from 'products';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        const flattenedProducts = productsData.flatMap(product =>
            product.packages.map(packageItem => ({
                id: `${product.name}-${packageItem.packageOption}`,
                productName: `${product.name} - ${packageItem.packageOption}`,
                currentInventory: packageItem.countInStock,
            }))
        );
        setProducts(flattenedProducts);
    }, []);

    const addNewProduct = () => {
        const newProduct = {
            id: `New Product-${products.length + 1}`,
            productName: `New Product ${products.length + 1}`,
            currentInventory: 10,
        };
        setProducts([...products, newProduct]);
    };

    const startEdit = (product) => {
        setEditingId(product.id);
        setEditValue(product.currentInventory.toString());
    };

    const saveEdit = async (productId, newInventory) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/update/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inventory: newInventory }),
            });
    
            if (!response.ok) throw new Error('Failed to update the product inventory.');
    
            const updatedProduct = await response.json();
            console.log('Product updated:', updatedProduct);
    
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValue('');
    };

    const navigateToProduct = (productId) => {
        window.location.href = `/products/${productId}`;
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
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    {product.productName}
                                    <button
                                        className="open-product-btn"
                                        style={{ float: 'right' }}
                                        onClick={() => navigateToProduct(product.productName)}
                                    >
                                        OPEN
                                    </button>
                                </td>
                                <td className="inventory-column">
                                    {editingId === product.id ? (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <input
                                                type="number"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                            />
                                            <div>
                                                <button
                                                    className="save-inventory-btn"
                                                    onClick={() => saveEdit(product.id)}
                                                >
                                                    SAVE
                                                </button>
                                                <button
                                                    className="cancel-inventory-btn"
                                                    onClick={cancelEdit}
                                                    style={{ marginLeft: '5px' }}
                                                >
                                                    CANCEL
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>{product.currentInventory}</span>
                                            <button
                                                className="edit-inventory-btn"
                                                onClick={() => startEdit(product)}
                                            >
                                                EDIT
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
