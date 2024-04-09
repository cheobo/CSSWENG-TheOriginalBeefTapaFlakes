import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './OrderManagement.css';

const OrderManagement = () => {
    const [filter, setFilter] = useState('All Orders');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

    const [items, setItems] = useState([
        { orderNumber: 1, status: 'Payment Not Confirmed' },
        { orderNumber: 2, status: 'Delivered' },
        { orderNumber: 3, status: 'Paid' },
        { orderNumber: 4, status: 'Processing' },
        { orderNumber: 5, status: 'Packed' },
        { orderNumber: 6, status: 'Shipped' },
        { orderNumber: 7, status: 'Cancelled' },
        { orderNumber: 8, status: 'Delivered' },
        // Add more items here
    ]);

    const [orderDetails, setOrderDetails] = useState([
        { orderNumber: 1,
            customerUsername: 'placeholder',
            productOrdered: 'Sub Reseller Package [Package A]',
            productOrderedCount: 1,
            address: 'placeholder',
            currentOrderStatus: 'Payment Not Confirmed',
            paymentProof: '',
            orderDatePlaced: '4/7/2024',
            orderDateCompleted: '' },
        { orderNumber: 2,
          customerUsername: 'placeholder',
          productOrdered: 'Sub Reseller Package [Package A]',
          productOrderedCount: 1,
          address: 'placeholder',
          currentOrderStatus: 'Delivered',
          paymentProof: 'Paid',
          orderDatePlaced: '4/7/2024',
          orderDateCompleted: '4/9/2024' },
    ]);

    const openOrderDetailsModal = (orderNumber) => {
        // Find the order details by orderNumber
        const details = orderDetails.find(order => order.orderNumber === orderNumber);
        if (orderDetails) {
            setSelectedOrderDetails(details);
            setShowDetailsModal(true);
        }
    };

    const handleStatusChange = (orderNumber, newStatus) => {
        const updatedItems = items.map((item) => {
            if (item.orderNumber === orderNumber) {
                return { ...item, status: newStatus };
            }
            return item;
        });
        setItems(updatedItems);
    };

    // Function to handle filter change
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Function to handle search change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="order-grid-container">
            <div className="order-elements-container">
                <h1 className="order-dashboard-title">
                    Order Management
                    <div>
                        <span className="order-filter-search">
                            Search:
                            <input
                                type="text"
                                placeholder="Order # (e.g. 1)"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </span>
                        <span className="order-filter-dropdown">
                            Filter:
                            <select
                                onChange={handleFilterChange}
                                value={filter}
                            >
                                <option value="All Orders">All Orders</option>
                                <option value="Payment Not Confirmed">Payment Not Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Paid">Paid</option>
                                <option value="Processing">Processing</option>
                                <option value="Packed">Packed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </span>
                    </div>
                </h1>
                <div className="order-grid-product">
                    <div className="order-cart-container">
                        <div className="order-flex-container">
                            <div className="order-product-container">
                                {items
                                    .filter(order => filter === "All Orders" || order.status === filter)
                                    .filter(order => searchQuery === '' || order.orderNumber.toString().includes(searchQuery))
                                    .map((order, index) => (
                                        <div key={index} className="item">
                                            <div className="order-product-details">
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <p>Order #: {order.orderNumber}</p>
                                                </div>
                                                <div className="order-price-quantity-container">
                                                    <div className="order-price-container">
                                                        <div className="order-price-quantity">
                                                            <span>Status: </span>
                                                            <select
                                                                className="order-status-dropdown"
                                                                value={order.status}
                                                                onChange={(e) => handleStatusChange(order.orderNumber, e.target.value)}
                                                            >
                                                                <option value="Payment Not Confirmed">Payment Not Confirmed</option>
                                                                <option value="Cancelled">Cancelled</option>
                                                                <option value="Paid">Paid</option>
                                                                <option value="Processing">Processing</option>
                                                                <option value="Packed">Packed</option>
                                                                <option value="Shipped">Shipped</option>
                                                                <option value="Delivered">Delivered</option>
                                                            </select>
                                                            <span style={{ marginLeft: '20px' }}>Order Details: </span>
                                                            <button
                                                                className="order-open-product-btn"
                                                                onClick={() => openOrderDetailsModal(order.orderNumber)}
                                                            >
                                                                OPEN
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                <Modal.Header>
                    <Modal.Title className="order-modal-title-center">
                        <h2>Order Details</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="order-modal-body-center">
                    {selectedOrderDetails ? (
                        <table className="order-modal-table">
                            <tbody>
                                <tr>
                                    <td>Customer Username: </td>
                                    <td>{selectedOrderDetails.customerUsername}</td>
                                </tr>
                                <tr>
                                    <td>Product Ordered: </td>
                                    <td>{selectedOrderDetails.productOrdered}</td>
                                </tr>
                                <tr>
                                    <td>Count: </td>
                                    <td>{selectedOrderDetails.productOrderedCount}</td>
                                </tr>
                                <tr>
                                    <td>Address: </td>
                                    <td>{selectedOrderDetails.address}</td>
                                </tr>
                                <tr>
                                    <td>Status: </td>
                                    <td>{selectedOrderDetails.currentOrderStatus}</td>
                                </tr>
                                <tr>
                                    <td>Payment Proof: </td>
                                    <td>{selectedOrderDetails.paymentProof}</td>
                                </tr>
                                <tr>
                                    <td>Order Date Placed: </td>
                                    <td>{selectedOrderDetails.orderDatePlaced}</td>
                                </tr>
                                <tr>
                                    <td>Order Date Completed: </td>
                                    <td>{selectedOrderDetails.orderDateCompleted}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p>No order details</p>
                    )}
                </Modal.Body>
                <Modal.Footer className="order-modal-footer-center">
                    <button className="order-modal-cancel-inventory-btn" onClick={() => setShowDetailsModal(false)}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrderManagement;
