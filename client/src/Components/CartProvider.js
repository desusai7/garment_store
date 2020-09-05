import React, { useContext, useState } from "react";

const CartContext = React.createContext();
const CartUpdateContext = React.createContext();
const CartAddItem = React.createContext();
const CartRemoveItem = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function useCartUpdate() {
  return useContext(CartUpdateContext);
}

export function useCartAddItem()
{
    return useContext(CartAddItem);
}

export function useCartRemoveItem()
{
    return useContext(CartRemoveItem);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const updateCart = (cart) => {
    setCart(cart);
  };

  function addToCart (itemToAdd, selectedColor, selectedSize)  {
    const itemIndex = cart.findIndex(
      (item) => item.product_id === itemToAdd.id
    );
    if (itemIndex === -1) {
      const newItem = {};
      newItem.product_id = itemToAdd.id;
      newItem.name = itemToAdd.name;
      newItem.price = itemToAdd.price;
      newItem.quantity = 1;
      newItem.color = selectedColor;
      newItem.size = selectedSize;
      setCart([...cart, newItem]);
      console.log(cart);
    } else {
      const updatedCart = [...cart];
      const item = updatedCart[itemIndex];
      item.quantity = item.quantity + 1;
      updatedCart[itemIndex] = item;
      setCart([...updatedCart]);
      console.log(cart);
    }
  };

  
  function removeFromCart (itemToRemove)  {
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

  return (
    <CartContext.Provider value={cart}>
      <CartUpdateContext.Provider value={updateCart}>
        <CartAddItem.Provider value={addToCart}>
          <CartRemoveItem.Provider value={removeFromCart}>
            {children}
            </CartRemoveItem.Provider>
        </CartAddItem.Provider>
      </CartUpdateContext.Provider>
    </CartContext.Provider>
  );
}

export default CartProvider;