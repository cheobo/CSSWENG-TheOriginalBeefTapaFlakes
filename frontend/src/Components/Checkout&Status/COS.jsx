import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import billIcon from '../../Assets/bill.png';
import './COS.css';

const COS = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleConfirmCheckout = () => {
    if (file && orderNumber) {
      // Add your checkout logic here
      setShowModal(false);
    } else {
      alert("Please upload a picture and enter the order number before proceeding.");
    }
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleOrderNumberChange = (event) => {
    setOrderNumber(event.target.value);
  }

  const [items, setItems] = useState([
    { orderNumber: 1, status: 'Processing' },
    { orderNumber: 2, status: 'Processing' },
    { orderNumber: 3, status: 'Processing' },
    { orderNumber: 4, status: 'Processing' },
    // Add more items here
  ])

  return (
    <div className="parent">
      <div className="div1">
        <div className="items-container" style={{overflowY: 'scroll', maxHeight: '500px'}}>
          {/* Map through your items */}
          {items.map((item, index) => (
            <div className={`item ${selectedItem === item ? 'selected' : ''}`} key={index} onClick={() => setSelectedItem(item)}>
              <div className="item-details">
                <p>Order #: {item.orderNumber}</p>
                <p>
                  Status: {item.status}
                  <button className="bill-btn" onClick={() => setShowModal(true)} style={{float: 'right'}}>
                    <img src={billIcon} alt="bill" style={{border: 'none', width: '30px', height: '30px'}} />
                  </button>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="div2">
        <div className="square-box">
          <p><strong>Description:</strong></p>
          <p>{selectedItem ? `Order #${selectedItem.orderNumber}: ${selectedItem.status}` : "No item selected"}</p>
        </div>
      </div>
      <div className="div3">
        <p><strong>Contact Details:</strong></p>
        <p>Testing</p>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Upload the proof of payment and Order #
          <br />
          <input type="file" onChange={handleFileChange} />
          <br />
          <input type="text" placeholder="Order #" value={orderNumber} onChange={handleOrderNumberChange} />
          <br />
          For cancellations please call or text 0963 690 9006 or 0917 426 4330.
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={handleCloseModal}>Back</button>
          <button className="btn" onClick={handleConfirmCheckout}>Confirm</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default COS;
