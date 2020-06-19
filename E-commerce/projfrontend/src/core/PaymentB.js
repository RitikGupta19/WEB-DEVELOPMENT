import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartEmpty, loadCart } from './helper/CartHelper';
import { getMeToken, processPayment } from './helper/PaymentBHelper';
import { createOrder } from './helper/OrderHelper';
import { isAuthenticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react';

const PaymentB = ({
    products,
    setReload = f => f,
    reload = undefined
}) =>  {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "", 
        // empty object which automatically gets filled with request
        instance: {}
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    //console.log(token);
    const getToken = (userId, token) => {
        getMeToken(userId, token)
        .then(info => {
            // console.log("INFORMATION:", info);
            if (info.error) {
                setInfo({...info, error: info.error})
            }
            else {
                const clientToken = info.clientToken;
                setInfo({clientToken});
            }
        });
    };
    
    const showBtDropIn = () => {
        return (
            <div>
            {info.clientToken !== null && products.length > 0 
                ? (<div>
                    <DropIn
                      options={{ authorization: info.clientToken }}
                      onInstance={(instance) => (info.instance = instance)}
                    />
                    <button 
                    className="btn btn-block btn-success"
                    onClick={onPurchase}>Pay</button>
                    </div>
                    )
                : (<h1>Please Login or Add something to Cart</h1>
                )}
            </div>
        );
    };

    useEffect(() => {
        getToken(userId, token);
    }, [])

    const onPurchase = () => {
        // payment going on so loading -> true
        setInfo({loading: true});
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
        .then(data => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData) 
            .then(response => {
                setInfo({
                    ...info, 
                    success: response.success,
                    loading: false,
                 });
                console.log("PAYMENT SUCCESS");
                const orderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount
                };
                createOrder(userId, token, orderData);
                cartEmpty(() => {
                    console.log("Cart Empty");
                })
                setReload(!reload);
            })
            .catch(err => {
                setInfo({
                    loading: false, 
                    success: false});
                console.log("PAYMENT FAILED");
            });
        });
    };

    const getAmount = () => {
        let amount = 0;
        products.map(product => {
            amount = amount + product.price;
        });
        return amount;
    };

    return (
        <div>
        <h1>BrainTree Payment Gateway</h1>
        <h2>Your Bill is {getAmount()} $</h2> 
        {isAuthenticated() && products.length > 0 ? (
            showBtDropIn()
        ) : (
            <div>
            {products.length == 0 ? (
                <div><h1>No product inside cart</h1></div>
            ) : (
                <div>
                <Link className="btn btn-block btn-warning" to="/signin">Login To Pay</Link>
                </div>
            ) }
            </div>
        ) }
    </div>
    );
};

export default PaymentB;

// {
//     products.length > 0 
//        ? (<h1>Please Login!</h1>) 
//        : (<h1>Add Products to Cart</h1>)
//    } 