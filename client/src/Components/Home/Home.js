import React, { useState, useEffect } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import "./Home.css";
import Axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [user,setUser]= useState(null);
  const [cart, setCart] = useState([]);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("red");
  const addToCart = (itemToAdd) => {
    const itemIndex = cart.findIndex(
      (item) => item.product_id === itemToAdd.id
    );
    if (itemIndex === -1) {
      const newItem ={} ;
      newItem.product_id = itemToAdd.id;
      newItem.name= itemToAdd.name;
      newItem.price = itemToAdd.price;
      newItem.quantity = 1;
      newItem.color = selectedColor;
      newItem.size = selectedSize;
      setCart([...cart, newItem]);
    } else {
      const updatedCart = [...cart];
      const item = updatedCart[itemIndex];
      item.quantity = item.quantity + 1;
      updatedCart[itemIndex] = item;
      setCart([...updatedCart]);
      console.log(cart);
    }
  };
  const removeFromCart = (itemToRemove) => {
    const itemIndex = cart.findIndex(
      (item) => item.product_id === itemToRemove.id
    );
    if (cart[itemIndex].quantity > 0) {
      const updatedCart = [...cart];
      const item = updatedCart[itemIndex];
      item.quantity = item.quantity - 1;
      updatedCart[itemIndex] = item;
      setCart([...updatedCart]);
    }
  };

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
      setUser(res.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);
  
  const getCart = async () => {
    console.log(user);
    if(user!==null && user!=="")
    {
    Axios({
      method: "GET",
      url: `http://localhost:5000/cartItems/${user.userid}`,
      withCredentials: true,
    }).then((res) => {
      setCart(res.data);
      console.log(res.data);
    });
  }
  else
  {
   setCart([]);
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
              addToCart={addToCart}
              removeFromCart={removeFromCart}
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
