import "./Product.css";
import React,{useState} from "react";
import { Button } from "@material-ui/core";
import {useCartAddItem , useCartRemoveItem} from "../CartProvider";
function Products({ product}) {
  
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("Red");
  
  
  const addToCart = useCartAddItem();
  const removeFromCart = useCartRemoveItem();
  
  return (
    <div className="product">
      <div className="product__info">
        
        <div className="product_details">
          <h1>{product.name}</h1>
          <h1> Price : {"$" + product.price}</h1>
        </div>

        <div className="product__variants">

          <div className="product__sizes">
            <p>Choose a trim color:</p>
            <div className="product__radio">
              <input
                type="radio"
                value="Red"
                name={"color" + product.id}
                checked={selectedColor === "Red"}
                onChange={(e) => setSelectedColor(e.target.value)}
              />{" "}
              Red <br />
              <input
                type="radio"
                value="Green"
                name={"color" + product.id}
                checked={selectedColor === "Green"}
                onChange={(e) => setSelectedColor(e.target.value)}
              />{" "}
              Green <br />
              <input
                type="radio"
                value="Blue"
                name={"color" + product.id}
                checked={selectedColor === "Blue"}
                onChange={(e) => setSelectedColor(e.target.value)}
              />{" "}
              Blue <br />
            </div>
            <Button
              style={{ backgroundColor: "#4caf50", color: "white" }}
              onClick={() => addToCart(product,selectedColor,selectedSize)}
              variant="contained"
              size="medium"
            >
              Add to Cart
            </Button>
          </div>

          <div className="product__colors">
            <p>Choose a size:</p>
            <div className="product__radio">
              <input
                type="radio"
                value="S"
                name={"size" + product.id}
                checked={selectedSize === "S"}
                onChange={(e) => setSelectedSize(e.target.value)}
              />{" "}
              Small <br />
              <input
                type="radio"
                value="M"
                name={"size" + product.id}
                checked={selectedSize === "M"}
                onChange={(e) => setSelectedSize(e.target.value)}
              />{" "}
              Medium <br />
              <input
                type="radio"
                value="L"
                name={"size" + product.id}
                checked={selectedSize === "L"}
                onChange={(e) => setSelectedSize(e.target.value)}
              />{" "}
              Large <br />
            </div>
            <Button
              style={{ backgroundColor: "#f44336", color: "white" }}
              onClick={() => removeFromCart(product,selectedColor,selectedSize)}
              variant="contained"
              size="medium"
            >
              Remove from Cart
            </Button>
          </div>

        </div>

      </div>

      <div className="product__selected">
        <h3 style={{ color: selectedColor }}>{selectedSize}</h3>
      </div>

      <div className="product__imageContainer">
        <img className="product__image" src={product.imageurl} alt="" />
      </div>

    </div>
  );
}

export default Products;
