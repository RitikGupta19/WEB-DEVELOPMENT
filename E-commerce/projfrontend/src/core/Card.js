import React, { useState, useEffect } from 'react';
import ImageHelper from './helper/ImageHelper';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
import { Redirect } from 'react-router-dom';

const Card = ({ 
    product, 
    addToCart=true, 
    removeFromCart=false, 
    setReload = f => f,
    reload = undefined
    }) => {

    const [redirect, setRedirect] = useState(false);

    const addToCartHandler = () => {
        addItemToCart(product, () => setRedirect(true));
    };

    const getRedirect = (redirect) => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    };

    const cartName = product ? product.name : "Default Name";
    const cartDescription = product ? product.description : "Default Description";
    const cartPrice = product ? product.price : "Default Price";

    const showAddToCart = () => {
        return (
            addToCart && (
                <button
                onClick={addToCartHandler}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
                </button>
            )
        );
    };

    const showRemoveFromCart = () => {
        return (
            removeFromCart && (
                <button
                onClick={() => {
                    removeItemFromCart(product._id);
                    // flip the operation true -> false
                    // false -> true
                    setReload(!reload);
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                Remove from cart
                </button>
            )
        );
    };

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartName}</div>
        <div className="card-body">
            {getRedirect(redirect)}
          <ImageHelper product={product}/>
          <p className="lead text-center bg-success font-weight-normal text-wrap">
           {cartDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">${cartPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart()}
            </div>
            <div className="col-12">
              {showRemoveFromCart()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card;