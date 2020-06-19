import React, {useState} from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { getUser } from './helper/userapicalls';

const AdminDashboard = () => {
	
	const {email, role, _id} = isAuthenticated() && isAuthenticated().user;
	const token = isAuthenticated() && isAuthenticated().token;
	
	const [name, setName] = useState("");

	const nameAdmin = () => {
		getUser(_id, token)
		.then(data => {
			if (data.error) {
				console.log(data.error);
			}
			else{
				setName(data.name);
			}
		})
	};

	const adminLeftSide = () => {
		return (
			<div className="card">
				<h4 className="card-header bg-dark text-white">Admin Navbar</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link 
							className="nav-link text-success"
							to="/admin/all/users">
							Users</Link>
					</li>
					<li className="list-group-item">
						<Link 
							className="nav-link text-success"
							to="/admin/create/category">
							Create Categories</Link>
					</li>
					<li className="list-group-item">
						<Link 
							className="nav-link text-success"
							to="/admin/categories">
							Manage Categories</Link>
					</li>
					<li className="list-group-item">
						<Link 
							className="nav-link text-success"
							to="/admin/create/product">
							Create Products</Link>
					</li>
					<li className="list-group-item">
						<Link 
							className="nav-link text-success"
							to="/admin/products">
							Manage Products</Link>
					</li>
					<li className="list-group-item">
						<Link 
							className="nav-link text-success"
							to="/admin/orders">
							Manage Orders</Link>
					</li>
				</ul>
			</div>
		);
	};

	const adminRightSide = () => {
		return (
			<div className="card mb-4">
				<h4 className="card-header">Admin Information</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Name:</span> {name}
					</li>
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Email:</span> {email}
					</li>
					<li className="list-group-item">
						<span className="badge badge-danger mr-2">Admin Area</span>
					</li>
				</ul>
			</div>
		);
	};

    return (
				<Base 
					title="Welcome to Admin Dashboard" 
					description="Manage Activities Here"
					className="container bg-success p-4">
						<div className="row">
						{nameAdmin()}
							<div className="col-3">{adminLeftSide()}</div>	
							<div className="col-9">{adminRightSide()}</div>
            </div>
        </Base>
		);
};

export default AdminDashboard;