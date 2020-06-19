import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { getUser } from './helper/userapicalls';

const UserDashboard = () => {

    const [name, setName] = useState("");
    const {user, token} = isAuthenticated();

    const nameUser = () => {
        getUser(user._id, token)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setName(data.name);
            }
        })
        .catch()
    };

    const userLeftSide = () => {
		return (
			<div className="card">
				<h4 className="card-header bg-dark text-white">User Navbar</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link 
							className="nav-link text-success"
							to="/user/profile">
							Profile</Link>
					</li>
					<li className="list-group-item">
						<Link 
							className="nav-link text-success"
							to="">
							Cart</Link>
					</li>
					<li className="list-group-item">
						<Link 
							className="nav-link text-success"
							to="">
							Orders</Link>
					</li>
					<li className="list-group-item">
						<Link 
							className="nav-link text-success"
							to="">
							Categories</Link>
					</li>
				</ul>
			</div>
		);
	};

	const userRightSide = () => {
		return (
			<div className="card mb-4">
				<h4 className="card-header">Admin Information</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Name:</span> {name}
                    </li>
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Email:</span> {user.email}
					</li>
					<li className="list-group-item">
						<span className="badge badge-info mr-2">User Area</span>
					</li>
				</ul>
			</div>
		);
	};
   
    return (
        <Base 
            title="Welcome to User Dashboard" 
            description="Manage Activities Here"
            className="container bg-success p-4">
                <div className="row">
                {nameUser()}
                    <div className="col-3">{userLeftSide()}</div>	
                    <div className="col-9">{userRightSide()}</div>
            </div>
        </Base>
        );
};

export default UserDashboard;