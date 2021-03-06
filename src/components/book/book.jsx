import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBook } from "../redux/actions/addBook";
import { getTotalSum } from "../redux/actions/totalSum";

import { Card, Button } from "react-bootstrap";
import { addIndexToBook } from "../redux/actions/addIndex";

const Book = ({ title, writter, price, genre, year, quantity, index }) => {
  const selectedBook = useSelector(state => state.bookReducer);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  const handleSelectBook = () => {
    dispatch(addIndexToBook(selectedBook.index));
    dispatch(
      selectBook({
        title,
        writter,
        price,
        genre,
        year,
        quantity,
        index: selectedBook.index
      })
    );
    dispatch(getTotalSum({ price }));
    handleToggleToTrue();
    handleToggleToFalse();
  };

  const handleToggleToTrue = () => {
    setTimeout(() => setIsLoaded(true), 100);
  };

  const handleToggleToFalse = () => {
    setTimeout(() => setIsLoaded(false), 5000);
  };

  return (
    <div>
      <Card
        style={{ flex: 1, width: "30rem", textAlign: "center", margin: "1rem" }}
      >
        <Card.Body>
          <Card.Title>
            <h3>{title}</h3>
          </Card.Title>
          <Card.Text>
            <p>Writte by {writter}.</p>
            <p>Book Genre is {genre}.</p>
            <p>Published on {year}.</p>
            <p>Price of this book is {price.toFixed(2)}$.</p>
            <span>Remaining quantity: {quantity}.</span>
            {index}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {isLoaded === false ? (
            <Button onClick={handleSelectBook}>Add to Cart</Button>
          ) : (
            <Button onClick={handleSelectBook} variant="success">
              Added!
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Book;
