import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { getAllOrders } from './helper/adminapicall';

const ManageOrders = () => {

		const [orders, setOrders] = useState([]);
		const { user, token } = isAuthenticated();
		const [users, setUsers] = useState([]);

		const getDetails = (transactionId) => {
			
		};

		const preLoad = () => {
			getAllOrders(user._id, token)
			.then(data => {
				if (data.error) {
					console.log(data.error);
				}
				else {
					console.log(data);
					setOrders(data);
				}
			})
			.catch(err => console.log(err));
		};

		useEffect(() => {
			preLoad();
		}, []);

		const deleteOrder = (orderId) => {

		};

		const orderTable = () => {
			return (
				<table className="table">
				<thead className="thead bg-success">
					<tr>
					<th scope="col">#</th>
					<th scope="col">Name</th>
					<th scope="col">Email</th>
					<th scope="col">Transaction Id</th>
					<th scope="col">Amount ($)</th>
					<th scope="col">Status</th>
					<th scope="col">Update Status</th>
					<th scope="col">Cancel Order</th>
					</tr>
				</thead>
				<tbody>
				{orders.map((order, index) => {
					return (
						<tr key={index} className="text-white">
						<th scope="row">{index}</th>
						<td>{}</td>
						<td>{}</td>
						<td>{order.transaction_id}</td>
						<td>{order.amount}</td>
						<td>{order.status}</td>
						<td><Link
							to="#"
							onClick={() => {}}
							className="badge badge-pill badge-success">Recieved</Link></td>
						{order.status === "Cancelled" ? (
							<td><Link
							to="#"
							onClick={() => {deleteOrder(order._id)}}
							className="badge badge-pill badge-danger">Delete</Link></td>
						) : (
							<td><button
							to="#"
							disabled
							className="badge badge-pill badge-secondary">Delete</button></td>
						) }
						</tr>
					)
				})}
				</tbody>
				</table>
			);
		};
	

    return (
        <Base 
            title="Manage Orders"
            description="Check all Orders Here!">
			{orderTable()}
            </Base>
    );
};

export default ManageOrders;

				// <tbody>
				// {users.map((user, index) => {
				// 	return (
				// 		<tr key={index} className="text-white">
				// 		<th scope="row">{index}</th>
				// 		<td>{user.name}</td>
				// 		<td>{user.lastname}</td>
				// 		<td>{user.email}</td>
				// 		<td>{user.role}</td>
				// 		{user.role === 1 ? (
				// 			<td><Link
				// 			to="#"
				// 			onClick={() => {changeRole(user._id, user.role)}}
				// 			className="badge badge-pill badge-success">Make User</Link></td>
				// 		) : (
				// 			<td><Link
				// 			to="#"
				// 			onClick={() => {changeRole(user._id, user.role)}}
				// 			className="badge badge-pill badge-warning">Make Admin</Link></td>
				// 		)}
	
				// 		<td><Link
				// 			to="#"
				// 			onClick={() => {deleteThisUser(user._id)}}
				// 			className="badge badge-pill badge-danger">Delete</Link></td>
				// 		</tr>
				// 	)
				// })}
				// </tbody>