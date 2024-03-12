import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [isEditing, setIsEditing] = useState(false); // New state to track editing mode

    const getProductsData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products', { method: 'GET' });
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await getProductsData();
            const flattenedProducts = productsData.flatMap(product =>
                product.packages.map(packageItem => ({
                    packageId: packageItem._id,
                    productId: product._id,
                    productName: `${product.name} - ${packageItem.packageOption}`,
                    currentInventory: packageItem.countInStock,
                }))
            );
            setProducts(flattenedProducts);
        };
        fetchProducts();
    }, []);

    const addNewProduct = () => {
        const newProduct = {
            productId: `New Product-${products.length + 1}`,
            productName: `New Product ${products.length + 1}`,
            currentInventory: 10,
        };
        setProducts([...products, newProduct]);
    };

    const startEdit = (product) => {
        setEditingId(product.packageId);
        setEditValue(product.currentInventory.toString());
        setIsEditing(true);
    };

    const saveEdit = async (productId, packageId, newInventory) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}/${packageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inventory: newInventory }),
            });

            if (!response.ok) throw new Error('Failed to update the product inventory.');

            const updatedProduct = await response.json();
            console.log('Product updated:', updatedProduct);

            setEditingId(null);
            setEditValue('');
            setIsEditing(false);
            window.location.reload();

        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValue('');
        setIsEditing(false);
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
                        <tr key={product.productId}>
                            <td>
                                {product.productName}
                                {
                                    <button
                                        className="open-product-btn"
                                        style={{ float: 'right' }}
                                        onClick={() => navigateToProduct(product.productId)}
                                    >
                                        OPEN
                                    </button>
                                }
                            </td>
                            <td className="inventory-column">
                                {editingId === product.packageId ? (
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <input
                                            type="number"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                        />
                                        <div>
                                            {isEditing && (
                                                <>
                                                    <button
                                                        className="save-inventory-btn"
                                                        onClick={() => saveEdit(product.productId, product.packageId, editValue)}
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
                                                </>
                                            )}
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