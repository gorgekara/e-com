import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Table, Button } from "react-bootstrap";
import { removeBook } from "../redux/actions/removeBook";
import { clearBooksFromCart } from "../redux/actions/clearCart";
import { reducePriceFromCart } from "../redux/actions/reducePrice";

const ShoppingCart = ({ title, price, index }) => {
  const selectedBooks = useSelector(state => state.bookReducer);
  const dispatch = useDispatch();

  const handleDeleteRedux = () => {
    dispatch(removeBook(index));
    console.log(selectedBooks.booksInCart[0]);
  };

  const booksFromCart = selectedBooks.booksInCart.map(
    ({ title, price, index }) => (
      <p>
        {index}.{title} - $ {price} -{" "}
        <Button onClick={handleDeleteRedux}> x </Button>
      </p>
    )
  );

  const totalSumOfCartItems = selectedBooks.sumsArray.reduce(
    (a, b) => a + b,
    0
  );

  const handleCheckOut = () => {
    console.log("Add payment method!");
  };

  const handleClearCart = () => {
    dispatch(clearBooksFromCart());
  };

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Selected Books</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{booksFromCart}</th>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total Amount</th>
          </tr>
          <tr>
            <th>{totalSumOfCartItems.toFixed(2)} $</th>
          </tr>
          <tr>
            <th>
              <Button onClick={handleCheckOut}>To Checkout</Button>
              <Button onClick={handleClearCart} variant="danger">
                Clear Cart
              </Button>
            </th>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default ShoppingCart;
