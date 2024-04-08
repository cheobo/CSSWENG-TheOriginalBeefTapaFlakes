    import React, { useEffect, useState } from 'react';
    import './AdminDashboard.css';
    import deleteIcon from '../../Assets/delete.png';

    function EditModal({ isOpen, onClose, product, onSave }) {
        const [editedProduct, setEditedProduct] = useState({});
        const [imageFile, setImageFile] = useState(null); 

        useEffect(() => {
            if (product && isOpen) {
                const bottlesPerFlavorString = product.bottlesPerFlavor
                    ? product.bottlesPerFlavor.map(bottle => `${bottle.flavor}: ${bottle.quantity}`).join('\n')
                    : '';

                setEditedProduct({
                    productImage: product.image || '',
                    productName: product.productName || '',
                    description: product.description || '',
                    packageOption: product.packageOption || '',
                    packageSize: product.packageSize || '',
                    bottlesPerFlavor: bottlesPerFlavorString || '',
                    price: product.price?.$numberDecimal?.toString() || '',
                    inventory: product.currentInventory?.toString() || '',
                    ingredients: product.ingredients || '',
                    nutritionalInfo: product.nutritionalInfo || '',
                });
            }
        }, [product, isOpen]);

        const handleChange = (e) => {
            const { name, value } = e.target;
        
            // If the input is of type number and the value is negative, set it to 0
            if (e.target.type === 'number' && parseFloat(value) < 0) {
                return setEditedProduct(prevState => ({
                    ...prevState,
                    [name]: 0
                }));
            }
        
            // Otherwise, update the state normally
            setEditedProduct(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
        

        const handleSubmit = () => {
            if (editedProduct.bottlesPerFlavor) {
                const bottlesPerFlavorArray = editedProduct.bottlesPerFlavor.split('\n').map(line => {
                    const [flavor, quantity] = line.split(':').map(part => part.trim());
                    return { flavor, quantity: parseInt(quantity, 10) };
                });

                
                const updatedProduct = { ...editedProduct, bottlesPerFlavor: bottlesPerFlavorArray };
                onSave(product.productId, product.packageId, updatedProduct);
            } else {
                onSave(product.productId, product.packageId, editedProduct);
            }
            handleImageUpload()
            onClose();
        };

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            setImageFile(file);
        }

        const handleImageUpload = async () => {
            if (imageFile) {
                try {
                    const formData = new FormData();
                    formData.append('file', imageFile);
                    const response = await fetch(`http://localhost:5000/api/upload/${product.productId}`, {
                        method: 'PUT',
                        body: formData,
                    });
    
                    if (!response.ok) {
                        throw new Error('Failed to upload image');
                    }
    
                    const imageUrl = await response.json();
                    setEditedProduct(prevState => ({
                        ...prevState,
                        productImage: imageUrl,
                    }));
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        }

        if (!isOpen) return null;

        return (
            <div className="modal">
                <div className="modal-content">
                    <h2>Edit Product</h2>
                    <table className="modal-table">
                        <tbody>
                            {Object.entries(editedProduct).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                                    <td>
                                    {['productName', 'description', 'packageOption', 'bottlesPerFlavor', 'ingredients', 'nutritionalInfo'].includes(key) ? (
                                        <textarea
                                            name={key}
                                            value={value}
                                            onChange={handleChange}
                                            placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                                            rows="3"
                                        />
                                    ) : key === 'productImage' ? (
                                        <div>
                                            <input
                                            type="file"
                                            name={key}
                                            accept="image/"
                                            onChange={handleImageChange}
                                            />
                                        </div>
                                        
                                    ) : (
                                        <input
                                            type={key === 'price' || key === 'inventory' || key === 'packageSize' ? 'number' : 'text'}
                                            name={key}
                                            value={value}
                                            onChange={handleChange}
                                            placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                                            step={key === 'price' ? '0.01' : '1'}
                                        />
                                    )}
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='modal-buttons'>
                        <button className="modal-save-inventory-btn" onClick={handleSubmit}>SAVE</button>
                        <button className="modal-cancel-inventory-btn" onClick={onClose}>CANCEL</button>
                    </div>
                </div>
            </div>
        );
    }

    function AddModal({ isOpen, onClose, onSave }) {
        const [newProduct, setNewProduct] = useState({
            productName: '',
            description: '',
            packageOption: '',
            packageSize: '',
            bottlesPerFlavor:  '',
            price: '',
            inventory: '',
            ingredients: '',
            nutritionalInfo: '',
        });
        const [imageFile, setImageFile] = useState(null);

        const handleChange = (e) => {
            const { name, value } = e.target;
        
            // If the input is of type number and the value is negative, set it to 0
            if (e.target.type === 'number' && parseFloat(value) < 0) {
                return setNewProduct(prevState => ({
                    ...prevState,
                    [name]: 0
                }));
            }
        
            // Otherwise, update the state normally
            setNewProduct(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
        

        const handleSubmit = () => {
            if (newProduct.bottlesPerFlavor) {
                const bottlesPerFlavorArray = newProduct.bottlesPerFlavor.split('\n').map(line => {
                    const [flavor, quantity] = line.split(':').map(part => part.trim());
                    return { flavor, quantity: parseInt(quantity, 10) };
                });

                
                const updatedProduct = { ...newProduct, bottlesPerFlavor: bottlesPerFlavorArray };
                onSave(updatedProduct);
            } else {
                onSave(newProduct);
            }
            onClose();
        };


        if (!isOpen) return null;

        return (
            <div className="modal">
                <div className="modal-content">
                    <h2>Add Product</h2>
                    <table className="modal-table">
                        <tbody>
                            {Object.entries(newProduct).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                                    <td>
                                        {['productName', 'description', 'packageOption', 'bottlesPerFlavor', 'ingredients', 'nutritionalInfo'].includes(key) ? (
                                            <textarea
                                                name={key}
                                                value={value}
                                                onChange={handleChange}
                                                placeholder={
                                                    key === 'productName' ? "e.g., Sub-Reseller Package" :
                                                    key === 'description' ? "e.g., Discover convenience and profit with our..." :
                                                    key === 'packageOption' ? "e.g., Package A" :
                                                    key === 'bottlesPerFlavor' ? "e.g.,\nClassic: 5\nSpicy: 5" :
                                                    key === 'ingredients' ? "e.g., Beef, Salt, Pepper..." :
                                                    key === 'nutritionalInfo' ? "e.g., Placeholder" :
                                                    "Placeholder"
                                                }
                                                rows="3"
                                            />
                                        ) : (
                                            <input
                                                type={key === 'price' || key === 'inventory' || key == 'packageSize' ? 'number' : 'text'}
                                                name={key}
                                                value={value}
                                                onChange={handleChange}
                                                placeholder={
                                                    key === 'packageSize' ? "e.g., 330" :
                                                    key === 'price' ? "e.g., 1975.0" :
                                                    key === 'inventory' ? "e.g., 10" :
                                                    "Placeholder"
                                                }
                                                step={key === 'price' ? '0.01' : '1'}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='modal-buttons'>
                        <button className="modal-save-inventory-btn" onClick={handleSubmit}>SAVE</button>
                        <button className="modal-cancel-inventory-btn" onClick={onClose}>CANCEL</button>
                    </div>
                </div>
            </div>
        );
    }

    const AdminDashboard = () => {
        const [products, setProducts] = useState([]);
        const [isEditModalOpen, setIsEditModalOpen] = useState(false);
        const [isAddModalOpen, setIsAddModalOpen] = useState(false);
        const [currentEditProduct, setCurrentEditProduct] = useState(null);

        const handleDelete = async (productId, packageId) => {
            if (window.confirm('Are you sure you want to delete this product?')) {
                try {
                    const token = localStorage.getItem('jwt');
                    const response = await fetch(`http://localhost:5000/api/products/remove/${productId}/${packageId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
        
                    if (!response.ok) {
                        throw new Error('Failed to delete product');
                    }
        
                    console.log('Product deleted successfully');
                } catch (error) {
                    console.error('Error deleting product:', error);
                    alert('An error occurred while deleting the product.');
                }
            }
        };

        useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/products');
                    if (!response.ok) throw new Error('Failed to fetch products');
                    const productsData = await response.json();
                    const flattenedProducts = productsData.flatMap(product =>
                        product.packages.map(packageItem => ({
                            packageId: packageItem._id,
                            productId: product._id,
                            productName: product.name,
                            description: product.description,
                            packageOption: packageItem.packageOption,
                            packageSize: packageItem.packageSize,
                            bottlesPerFlavor: packageItem.bottlesPerFlavor,
                            price: packageItem.price,
                            currentInventory: packageItem.countInStock,
                            ingredients: product.ingredients,
                            nutritionalInfo: product.nutriInfo,
                            image: product.image,
                            imageId: product.imageId
                        }))
                    );
                    setProducts(flattenedProducts);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            };
            fetchProducts();
        }, [products]);

        const addNewProduct = () => {
            setIsAddModalOpen(true);
        };
        
        const navigateToProduct = (productId) => {
            window.location.href = `/products/${productId}`;
        };

        const startEdit = (product) => {
            setCurrentEditProduct(product);
            setIsEditModalOpen(true);
        };

        const saveEdits = async (productId, packageId, updatedProduct) => {
            const token = localStorage.getItem('jwt');
            try {
                const response = await fetch(`http://localhost:5000/api/products/${productId}/${packageId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedProduct),
                });

                if (!response.ok) throw new Error('Failed to update the product details');
                const editedProduct = await response.json();
                console.log(editedProduct.message);

                setIsEditModalOpen(false);
                // Refresh the product list or update state if necessary
            } catch (error) {
                console.error('Error updating product:', error);
            }
        };

        const handleAddProduct = async (newProductData) => {
            const token = localStorage.getItem('jwt');
            try {
                // Send the new product data to the server
                const response = await fetch('http://localhost:5000/api/products/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(newProductData),
                });

                if (!response.ok) throw new Error('Failed to add new product');
                const updatedProducts = await response.json();
                setProducts([...products, updatedProducts]);
                
                
                console.log(updatedProducts.message)
                // Close the modal after saving
                setIsAddModalOpen(false);
            } catch (error) {
                console.error('Error adding new product:', error);
            }
        };

        return (
            <div className="admin-grid-container">
                <div className="admin-elements-container">
                    <h1 className="dashboard-title">Admin Dashboard</h1>
                    <div className="admin-grid-product">
                        <div className="admin-cart-container">
                            <div className="admin-flex-container">
                                <div className="admin-product-container">
                                    {products.map((product) => (
                                        <div key={product.packageId} className="item">
                                            <img src={`http://localhost:5000/${product.image}`} alt={product.productName} />
                                            <div className="admin-product-details">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <p>{product.productName} [{product.packageOption}]</p>
                                                <div className="product-action-buttons">
                                                    <button
                                                        className="open-product-btn"
                                                        
                                                        onClick={() => navigateToProduct(product.productId)}
                                                    >
                                                        OPEN
                                                    </button>
                                                    <button
                                                        className="admin-delete-btn"
                                                        style={{ float: 'right' }}
                                                        onClick={() => handleDelete(product.productId, product.packageId)}
                                                    >
                                                        <img src={deleteIcon} alt="delete"/>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="admin-price-quantity-container">
                                                <div className="admin-price-container">
                                                    <div className="admin-price-quantity">
                                                        <p>Price: </p>
                                                    </div>
                                                    <div className="admin-price-value">
                                                        <span>{parseFloat(product.price?.$numberDecimal)?.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</span>
                                                    </div>
                                                </div>
                                                <div className="admin-quantity-container">
                                                    <div className="admin-price-quantity">
                                                        <p>Inventory: </p>
                                                    </div>
                                                    <div className="admin-quantity-value">
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ marginTop: '2px' }}>{product.currentInventory}</span>
                                                            <button
                                                                className="edit-inventory-btn"
                                                                style={{ marginRight: '3px' }}
                                                                onClick={() => startEdit(product)}
                                                            >
                                                                EDIT
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="add-product-btn add-btn" onClick={addNewProduct}>+ Add Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    product={currentEditProduct}
                    onSave={saveEdits}
                />
                <AddModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleAddProduct}
                />
            </div>
        );
    };

    export default AdminDashboard;
