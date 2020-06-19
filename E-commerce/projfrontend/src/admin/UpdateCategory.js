import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getACategory, updateCategory } from './helper/adminapicall';

const UpdateCategories = ({match}) => {
	
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const { user, token } = isAuthenticated();

	const changeHandler = (event) => {
		setError("");
		setName(event.target.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();
		setError("");
        setSuccess(false);

        updateCategory(match.params.categoryId, user._id, token, name)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setName("");
                setError("");
                setSuccess(true);
            }
        })
	};

	const goBack = () => {
		return (
			<div>
				<Link 
					to="/admin/dashboard"
					className="btn btn-md btn-dark mb-3">Admin Home</Link>
			</div>
		);
    };
    
    const preLoad = (categoryId) => {
        getACategory(categoryId)
        .then(data => {
            //console.log(data);
			if (data.error) {
				console.log(data.error);
			}
			else {
				setName(data.name);
			}
		})
    };

    useEffect(() => {
        preLoad(match.params.categoryId);
    }, []);

	const myUpdateCategoryForm = () => {
        return (
				<form>
					<div className="form-group">
						<p className="lead my-3">Enter Category:</p>
						<input 
							type="text" 
							className="form-control my-3"
							autoFocus
							required
							placeholder="For Eg. Summer"
							onChange={changeHandler}
							value={name}/>
						<button 
							className="btn btn-outline-info"
							onClick={onSubmitHandler}>Update Category</button>
					</div>
				</form>
			);
	};
	
	return (
		<Base
		className="container bg-info p-4"
		title="Update Categories"
		description="Change/Update your categories here">
			<div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
				{myUpdateCategoryForm()}
				{goBack()}
			</div>
			</div>
		</Base>
	);
};

export default UpdateCategories;