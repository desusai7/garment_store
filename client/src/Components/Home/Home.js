import React, { useState, useEffect } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import "./Home.css";
import Axios from "axios";
import {useCart , useCartUpdate} from "E:/Weekend Projects/garment-store/client/src/Context/CartProvider";
import {useUser , useUserUpdate} from "E:/Weekend Projects/garment-store/client/src/Context/UserProvider";

function Home() {
  const [products, setProducts] = useState([]);
  const user = useUser();
  const updateUser = useUserUpdate();
  const cart = useCart();
  const updateCart = useCartUpdate(); 
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("red");
  

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

  const getUser = async () => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/user",
      withCredentials: true,
    }).then((res) => {
      updateUser(res.data);
      console.log(user);
    });
  };

  useEffect(() => {
    getUser();
  }, []);
  
  const getCart = async () => {
    if(user!==null && user!=="")
    {
    Axios({
      method: "GET",
      url: `http://localhost:5000/cartItems/${user.user_id}`,
      withCredentials: true,
    }).then((res) => {
      updateCart(res.data);
    });
  }
  else
  {
   updateCart([]);
  }
  };
  
  useEffect(() => {
    getCart();
  }, [user]);

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
              selectedSize = {selectedSize}
              selectedColor = {selectedColor}
              setSelectedSize ={setSelectedSize}
              setSelectedColor ={setSelectedColor}
            />
          ))}
        </div>

        <div className="home__bodyCartContainer">
          <Cart cart={cart} />
        </div>
      </div>
    </div>
  );
}

export default Home;
