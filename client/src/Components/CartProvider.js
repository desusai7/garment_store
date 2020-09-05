import React, { useContext, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import ButtonBS from 'react-bootstrap/Button';

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
  const [show, setShow] = useState(false);
  const [modalContent,setModalContent] = useState('');
  const updateCart = (cart) => {
    setCart(cart);
  };
  const handleClose = () => 
  {
    setShow(false);
  }

  // Adding an item into the cart
  function addToCart (itemToAdd, selectedColour, selectedSize)  {
    const itemIndex = cart.findIndex(
      (item) => item.product_id === itemToAdd.id && item.colour===selectedColour && item.size===selectedSize
    );
    if (itemIndex === -1) {
      const newItem = {};
      newItem.product_id = itemToAdd.id;
      newItem.name = itemToAdd.name;
      newItem.price = itemToAdd.price;
      newItem.quantity = 1;
      newItem.colour = selectedColour;
      newItem.size = selectedSize;
      setCart([...cart, newItem]);
    } else {
      const updatedCart = [...cart];
      const item = updatedCart[itemIndex];
      item.quantity = item.quantity + 1;
      updatedCart[itemIndex] = item;
      setCart([...updatedCart]);
    }
  };

  // Removing an item from Cart
  function removeFromCart (itemToRemove,selectedColour,selectedSize)  {
    const itemIndex = cart.findIndex(
      (item) => item.product_id === itemToRemove.id && item.colour===selectedColour && item.size===selectedSize
    );
    if(itemIndex!==-1)
    {
    if (cart[itemIndex].quantity > 0) {
      const updatedCart = [...cart];
      const item = updatedCart[itemIndex];
      item.quantity = item.quantity - 1;
      
      updatedCart[itemIndex] = item;
      setCart([...updatedCart]);
    }
  }
  // Alerting if an item is not present in the cart
  else{
    setModalContent("There is no "+itemToRemove.name+" in your Cart with Size: "+selectedSize+" and Colour: "+selectedColour);
    setShow(true);
  }
  };

  return (
    <div className="cartProvider">
    <CartContext.Provider value={cart}>
      <CartUpdateContext.Provider value={updateCart}>
        <CartAddItem.Provider value={addToCart}>
          <CartRemoveItem.Provider value={removeFromCart}>
            {children}
            </CartRemoveItem.Provider>
        </CartAddItem.Provider>
      </CartUpdateContext.Provider>
    </CartContext.Provider>
    <div className="cart__modal">
      <Modal show={show} onHide={handleClose} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Invalid Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <ButtonBS variant="danger" onClick={handleClose}>
            Close
          </ButtonBS>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
}

export default CartProvider;
