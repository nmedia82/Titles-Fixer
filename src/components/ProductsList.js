import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { FixTitles } from "../services/model";

const ProductsList = ({ Products }) => {
  const handleFixTitles = async () => {
    const titles = Products.map((p) => ({ title: p.name }));
    console.log(titles);

    const postData = { titles, user_prompt: "" };
    const resp = await FixTitles(postData);
    console.log(resp);
  };
  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <Button
            onClick={handleFixTitles}
            variant="primary"
            className="float-right"
          >
            Fix Titles
          </Button>
          <span>www.myapop.com</span>
        </div>
      </Card.Header>
      <ListGroup variant="flush">
        {Products.map((product) => (
          <ListGroup.Item key={product.id}>
            <strong>{product.id}:</strong> {product.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Footer>
        <Button onClick={handleFixTitles} variant="primary" block>
          Fix Titles
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductsList;
