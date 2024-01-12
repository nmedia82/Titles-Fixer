import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";

const ProductsList = ({ Products }) => {
  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" className="float-right">
            Fix Titles
          </Button>
          <span>www.myapop.com</span>
        </div>
      </Card.Header>
      <ListGroup variant="flush">
        {Products.map((product) => (
          <ListGroup.Item key={product.id}>
            <strong>ID:</strong> {product.id}
            <br />
            <strong>Title:</strong> {product.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Footer>
        <Button variant="primary" block>
          Fix Titles
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductsList;
