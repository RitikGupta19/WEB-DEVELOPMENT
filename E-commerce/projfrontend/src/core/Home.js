import React, {useState, useEffect } from 'react';
import '../styles.css'; 
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

const Home = ()  => {
  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts()
    .then((data) => {
      //console.log(data);
      if (data.error) {
        setError(data.error);
      } 
      else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

    return (
        <Base title="Is Fashion your way? You came right place!" description="Welcome to the Exclusive Tshirt Store">
        <div className="row text-center">
            <div className="row">
              {products.map((product, index) => {
                return (
                  <div key={index} className="col-4 mb-4">
                    <Card product={product} />
                  </div>
                );  
              })}
            </div>
          </div> 
      </Base>
    );
};

export default Home;
