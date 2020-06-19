import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { getCategories, deleteCategory } from './helper/adminapicall';

const ManageCategory = () => {

	const [categories, setCategories] = useState([]);
	const { user, token } = isAuthenticated();

	const preLoad = () => {
		getCategories()
		.then(data => {
			if (data.error) {
				console.log(data.error);
			}
			else {
				setCategories(data);
			}
		})
	};

	useEffect(() => {
		preLoad();
	}, []);

	const deleteThisCategory = (categoryId) => {
		deleteCategory(categoryId, user._id, token)
		.then(data => {
			if (data.error) {
				console.log(data.error);
			}
			else {
				preLoad();
			}
		})
	};

	return (
		<Base
		title="Manage Category Section"
		description="Update Categories Here!"
		>
			<Link 
			to="/admin/dashboard"
			className="btn btn-md btn-info mb-3">Admin Home</Link>
			<h1>You have {categories.length} Categoires:</h1>
			<div className="row">
			<div className="col-8 offset-md-2">
					{categories.map((category, index) => {
						//console.log(category);
						return (
							<ul class="list-group">
							<li class="row list-group-item d-flex justify-content-between align-items-center bg-info mb-3">
								<p className="col-4">{category.name}</p>
								<Link 
										to={`/admin/category/update/${category._id}`}	
										className="btn btn-success btn-md col-4">Update</Link>
								<button 
									className="btn btn-danger col-4"
									onClick={() => {deleteThisCategory(category._id)}}>Delete</button>
							</li>
							</ul>
							// <div key={index} className="row text-center mb-2">
							// 	<div className="col-4">
							// 		<h2 className="text-white">{category.name}</h2>
							// 	</div>
							// 	<div className="col-4">
							// 		<Link 
							// 			to={`/admin/category/update/${category._id}`}	
							// 			className="btn btn-success">Update</Link>
							// 	</div>
							// 	<div className="col-4">
							// 	<button 
							// 		className="btn btn-danger"
							// 		onClick={() => {deleteThisCategory(category._id)}}>Delete</button>
							// 	</div>
							// </div>
						);
					})}
					</div>
					</div>
		</Base>
	);
};

export default ManageCategory;