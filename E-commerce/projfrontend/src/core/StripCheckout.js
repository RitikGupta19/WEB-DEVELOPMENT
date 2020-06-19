// code for stripe

import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { loadCart, cartEmpty } from './helper/CartHelper';
import StripeCheckoutButton from 'react-stripe-checkout';
import {API} from '../backend';
import { createOrder } from './helper/OrderHelper';

const StripeCheckout = ({
    products,
    setReload = f => f,
    reload = undefined
}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        // address and alll other are not strored in DB
        // handled by stripe
        address: ""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalValue = () => {
        let amount = 0;
        products.map((product) => {
            amount = amount + product.price;
        });
        return amount;
    };
    
    const makePayment = (token) => {
        const body = {
            token,
            products
        };
        const headers = {
            "Content-Type": "application/json"
        };
        
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
        .then(response => {
            console.log(response);
            const {status} = response;
            console.log("STATUS: ", status);
            //cartEmpty();
        })
        .catch(err => console.log(err));
    };

    const showStripeButton = () => {
        return isAuthenticated() ? (
            // <StripeCheckoutButton
            // stripeKey="pk_test_51GpsXkFavV2imROS8S9knhODHrewG5Vr2qxaezWH74ES1wXxoqLZnKTGhd8y3y7wWfpe2lyKfjyWXZJ4HUADa2SF001VobRPy4"
            // token={makePayment}
            // amount={getFinalValue() * 100}
            // // will appear top of pop-up
            // name="BUY TSHIRT"
            // shippingAddress
            // billingAddress>
                <button className="btn btn-success">Pay Now using Stripe!</button>
            // </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Sign In</button>
            </Link>
        ) ;
    };

    return (
        <div>
            <h1 className="text-white">Stripe Checkout Section</h1>
            <h2>Total Amount: {getFinalValue()}</h2>    
            {showStripeButton()}
        </div>
    );
};


export default StripeCheckout;
