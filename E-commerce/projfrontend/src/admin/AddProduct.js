import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { getCategories, createProduct, createCategory } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

const AddProducts = () => {
	
	const { user, token } = isAuthenticated();

	const [ values, setValues ] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		photo: "",
		categories: [],
		category: "",
		loading: false,
		error: "",
		createProduct: "",
		getRedirect: false,
		// Not a normal form , data needs to be formatted to send as JSON
		formData: ""	
	});

	const { name, 
					description, 
					price, 
					stock, 
					categories,
					category, 
					loading, 
					error, 
					createdProduct, 
					getRedirect, 
          formData
				} = values;

	const preLoad = () => {
		getCategories().then((data) => {
			//console.log(data);
			if (data.error) {
				setValues({ ...values, error:data.error });
			}
			else {
				setValues({ ...values, categories: data, formData: new FormData() });
			}
		});
	};

  useEffect(() => {
    preLoad();
  }, []);

	const changeHandler = name => event => {
		// Storing Value from keyboard/input
		// First part will run if pic else 2nd part
		const value = name === 'photo' ? event.target.files[0] : event.target.value;
		// Setting data into form
		formData.set(name, value);
		setValues({ ...values, error: "", [name]: value });
	};

	const onSubmitHandler = (event) => {
    event.preventDefault();
    setValues({...values, error: "", loading: true});
    createProduct(user._id, token, formData)
    .then(data => {
      if (data.error) {
        setValues({...values, error: data.error});
      }
      else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
	};

  const successMessage = () => {
    return (
      <div className="alert alert-success"
        style={{display : createdProduct ? "" : "none" }}>
          <h4>{createdProduct} created Successfully.</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="alert alert-danger"
        style={{display : error ? "" : "none" }}>
          <h4>Unable to save the Product</h4>
      </div>
    );
  };

	const createProductForm = () => (
    <form >
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-info">
          <input
            onChange={changeHandler("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={changeHandler("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={changeHandler("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={changeHandler("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={changeHandler("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories && (
						categories.map((cat, index) => {
							return <option key={index} value={cat._id}>{cat.name}</option>
						})
					)}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={changeHandler("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>
      
      <button type="submit" onClick={onSubmitHandler} className="btn btn-outline-success mb-3">
        Create Product
      </button>
    </form>
	);
	
    return (
        <Base 
            className="container bg-info p-4"
						title="Product Creation"
						description="Create Exclusive Products Here">
						<Link 
							to="/admin/dashboard"
							className="btn btn-md btn-dark mb-3">Admin Home</Link>
						<div className="row bg-dark text-white rounded">
              <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
								{createProductForm()}
							</div>
						</div>
        </Base>
    );
};

export default AddProducts;