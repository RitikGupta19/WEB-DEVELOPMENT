import React, {useState, useEffect } from 'react';
import '../styles.css'; 
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import StripeCheckout from './StripCheckout';
import PaymentB from './PaymentB';

const Cart = ()  => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <div>
                <h1>All products are loaded here!</h1>
                {products.map((product, index) => (
                        <Card 
                        key={index}
                        product={product}
                        addToCart={false}
                        removeFromCart={true}
                        setReload={setReload}
                        reload={reload} />
                    )
                )}
                </div>
        );
    };

    const loadCheckout = () => {
        return (
          <div>
            <h2>This section for checkout</h2>
          </div>
        );
      };

      return (
        <Base title="Your Cart" description="You really have a good choice! :)">
        <div className="row text-center">
        <div className="col-6">
        {products.length > 0 ? loadAllProducts(products) : (<h1>Your Cart is Empty :( <br/>Lets pick something</h1>)}</div>
        <div className="col-6">
          <PaymentB 
          products={products}
          setReload={setReload}/>
          </div>
        </div> 
      </Base>
    );
};

export default Cart;


            // {<StripeCheckout 
            // 	products={products}
            // 	setReload={setReload}
            // 	/>}