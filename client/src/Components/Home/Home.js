import "./Home.css";
import React, { useState, useEffect } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import Axios from "axios";
import {useUser , useUserUpdate} from "../UserProvider";

function Home() {
  const [products, setProducts] = useState([]);
  
  const updateUser = useUserUpdate();
 
  // Retrieving all the products in the store
  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      const jsonData = await response.json();
      setProducts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Retrieving Currentuser Details
  const getUser = async () => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/user",
      withCredentials: true,
    }).then((res) => {
      updateUser(res.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);
  
  
  return (
    <div className="home">
      
      <div className="home__heading">
        <center>
          <h1>Products</h1>
        </center>
      </div>
      
      <div className="home__body">
        
        <div className="home__bodyProductContainer">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="home__bodyCartContainer">
          <Cart/>
        </div>

      </div>

    </div>
  );
}

export default Home;
