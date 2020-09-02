import React, { useState } from "react";
import "./Cart.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import Axios from "axios";
import ReactGA from "react-ga";
import Modal from 'react-bootstrap/Modal';
import ButtonBS from 'react-bootstrap/Button';
import {useUser} from "E:/Weekend Projects/garment-store/client/src/Context/UserProvider";
const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});



function Cart({ cart }) {
  const classes = useStyles();

  const user = useUser();
  const [show, setShow] = useState(false);
  const [modalContent,setModalContent] = useState('');
  const handleClose = () => setShow(false);
  

  const invoiceTotal = cart.reduce(function (acc, curr) {
    return acc + curr.quantity * curr.price;
  }, 0);

  const updateCart = async () => {
    if(user==="" || user===undefined || user===null)
    {
        setModalContent("Please login First in Order to Submit your Cart");
        setShow(true);
    }
    else
    {
      Axios({
        method: "POST",
        url: `http://localhost:5000/cartItems/${user.userid}`,
        data: cart,
        withCredentials: true,
      }).then((res) => {
        if(res.data.Status==="Submitted")
        {
        ReactGA.event({
          category: "Garment",
          action: "Saving Cart",
          label: "Cart",
          value: invoiceTotal,
        });
        setModalContent("Your Cart Has Been Submitted Successfully");
        setShow(true);
      }
      else
      {
        setModalContent("Error Occured , Please try Again :) ");
        setShow(true);
      }
      });
    }
    
  };


  return (
    <div className="cart">
      <div className="cart__body">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          {cart.length === 0 ? (
            <TableBody>
              <TableRow className="error">
                <TableCell align="center" colSpan={3}>
                  You do not have any Products in the Cart
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <>
              <TableHead>
                <TableRow className="success">
                  <TableCell align="center" colSpan={3}>
                    Your Cart
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map(
                  (item) =>
                    item.quantity > 0 && (
                      <TableRow key={item.product_id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">{"$" + item.price}</TableCell>
                      </TableRow>
                    )
                )}
                <TableRow className="success">
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{"$" + invoiceTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Button
                      style={{ backgroundColor: "#4caf50", color: "white" }}
                      variant="contained"
                      size="medium"
                      onClick={updateCart}
                      color="primary"
                    >
                      Submit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
      </div>
      <div className="cart__modal">
      <Modal show={show} onHide={handleClose} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Your Cart</Modal.Title>
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
export default Cart;
