import React, { useState } from "react";
import "./Product.css";
import { Button } from "@material-ui/core";
function Products({ product, addToCart, removeFromCart ,selectedSize, selectedColor, setSelectedSize, setSelectedColor}) {
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
                value="red"
                name={"color" + product.id}
                checked={selectedColor === "red"}
                onChange={(e) => setSelectedColor(e.target.value)}
              />{" "}
              Red <br />
              <input
                type="radio"
                value="green"
                name={"color" + product.id}
                checked={selectedColor === "green"}
                onChange={(e) => setSelectedColor(e.target.value)}
              />{" "}
              Green <br />
              <input
                type="radio"
                value="blue"
                name={"color" + product.id}
                checked={selectedColor === "blue"}
                onChange={(e) => setSelectedColor(e.target.value)}
              />{" "}
              Blue <br />
            </div>
            <Button
              style={{ backgroundColor: "#4caf50", color: "white" }}
              onClick={() => addToCart(product)}
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
              onClick={() => removeFromCart(product)}
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
