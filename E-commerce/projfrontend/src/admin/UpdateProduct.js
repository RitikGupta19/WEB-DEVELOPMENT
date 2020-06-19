import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { getCategories, getProduct, updateProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

// match to handle the url contents
const UpdateProduct = ({ match }) => {
	
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
		createdProduct: "",
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

	const preLoad = (productId) => {
		getProduct(productId).then((data) => {
			//console.log(data);
			if (data.error) {
				setValues({ ...values, error:data.error });
			}
			else {
                preloadCategories();
				setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    // this will store category id , but will
                    // not able to get the actual category from remaining options
                    category: data.category._id,
                    // made new form available to update data
                    formData: new FormData()
                 });
			}
		});
	};

   const preloadCategories = () => {
        getCategories()
        .then(data => {
            if (data.error) {
                setValues({ ...values, error:data.error });
            }
            else {
                setValues({
                    categories: data,
                    // to populate the form data
                    formData: new FormData()
                })
            }
        });
   } ;

  useEffect(() => {
    preLoad(match.params.productId);
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

    updateProduct(match.params.productId, user._id, token, formData)
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
          <h4>{createdProduct} updated Successfully.</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="alert alert-danger"
        style={{display : error ? "" : "none" }}>
          <h4>Unable to update the Product</h4>
      </div>
    );
  };

	const updateProductForm = () => (
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
      
      <button 
        type="submit" 
        onClick={onSubmitHandler} 
        className="btn btn-outline-success mb-3">
        Update Product
      </button>
    </form>
	);
	
    return (
        <Base 
          className="container bg-info p-4"
			    title="Product Updation"
			    description="Update your Products">
			  <Link 
				  to="/admin/dashboard"
				  className="btn btn-md btn-dark mb-3">Admin Home</Link>
			  <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
				        {updateProductForm()}
			  </div>
			  </div>
        </Base>
    );
};

export default UpdateProduct;
