import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import billIcon from '../../Assets/bill.png';
import './COS.css';
import {decodeToken} from "react-jwt";

const COS = () => {
	const [showModal, setShowModal] = useState(false);
	const [file, setFile] = useState(null);
	const [orderNumber, setOrderNumber] = useState("");
	const [selectedItem, setSelectedItem] = useState(null);

	const handleCloseModal = () => setShowModal(false);
	const handleConfirmCheckout = async () => {
		if (file && orderNumber) {
			try {
				const data = new FormData();
				data.append('orderId', orderNumber);
				data.append('proofOfPayment', file);

				const response = await fetch('http://localhost:5000/api/orders/submitProofOfPayment', {
					body: data,
					method: 'POST',
				});

				if (response.ok) {
					setShowModal(false);
				} else {
					alert('Upload failed, please try again.');
				}
			} catch (error) {
				console.log(error);
			}
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

	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = localStorage.getItem('jwt');

				if (!token) {
					console.error('JWT token not found in localStorage');
					return;
				}

				const decoded_token = decodeToken(localStorage.getItem('jwt'));
				const userId = decoded_token._id;

				const response = await fetch(`http://localhost:5000/api/orders/fetchOrders/${userId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				const data = await response.json();

				setItems(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="parent">
			<div className="div1">
				<div className="items-container" style={{ overflowY: 'scroll', maxHeight: '720px' }}>
					{items.map((item, index) => (
						<div
							className={`item ${selectedItem === item ? 'selected' : ''}`}
							key={index}
							onClick={() => setSelectedItem(selectedItem === item ? null : item)}>
							<div className="item-details">
								<p>Order ID: {item._id}</p>
								<p>
									Status: {item.status}
									<button
										className="bill-btn"
										onClick={(e) => {
											e.stopPropagation(); // Prevent click from bubbling to item div.
											setShowModal(true);
										}}
										disabled={selectedItem !== item} // Disable button if this item is not the selected item
										style={{
											float: 'right',
											cursor: selectedItem === item ? 'pointer' : 'not-allowed', // Change cursor based on whether this item is selected
											opacity: selectedItem === item ? '1' : '0.5' // Change opacity to indicate disabled state visually for non-selected items
										}}>
										<img src={billIcon} alt="bill" style={{ border: 'none', width: '30px', height: '30px' }} />
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
					<p>{selectedItem ? `Order ID ${selectedItem._id}: ${selectedItem.status}` : "No item selected"}</p>
				</div>
			</div>
			<div className="div3">
				<div className="square-box">
					<p><strong>Contact Details:</strong></p>
					<p>BDO Savings: 005430247449 (Kristine Gail Sandoval)</p>
					<p>RCBC Checking / RCBC Diskartech: 7590702855</p>
					<p>(Kristine Gail Sandoval-Zamora)</p>
					<p>Limited BPI to BPI Only: 8489340519</p>
					<p>(Kristine Gail Sandoval)</p>
					<p>GCash: 0963 690 9006 (Kristine Gail Sandoval)</p>
					<p>Alternative GCash: 0917 426 4330 (Raul Zamora Jr.)</p>
					<p>UnionBank Savings: 1093 4042 0640 (Kristine Gail Sandoval)</p>
				</div>
			</div>


			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header>
					<Modal.Title className="modal-title-center">
						<h2>Payment</h2>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="modal-body-center">
					<table className="cos-modal-table">
						<tbody>
							<tr>
								<td>Upload the proof of payment</td>
								<td>Order ID</td>
							</tr>
							<tr>
								<td>
									<input type="file" onChange={handleFileChange} />
								</td>
								<td>
									<input type="text" placeholder="Order ID" value={orderNumber} onChange={handleOrderNumberChange} />
								</td>
							</tr>
						</tbody>
					</table>
					<p>For cancellations please call or text 0963 690 9006 or 0917 426 4330.</p>
				</Modal.Body>
				<Modal.Footer className="modal-footer-center">
					<button className="modal-save-inventory-btn" onClick={handleCloseModal}>Back</button>
					<button className="modal-cancel-inventory-btn" onClick={handleConfirmCheckout}>Confirm</button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default COS;
