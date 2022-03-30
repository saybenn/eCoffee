import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  const styles = {
    card: {},
    cardImage: {
      objectFit: "cover",
      maxHeight: "40vh",
    },
  };
  return (
    <Card key={product._id} className="rounded mb-5" style={styles.card}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" style={styles.cardImage} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text>${product.price.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
