import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const MyCredits = ({
  TitleCredits,
  WebsiteCredits,
  onViewChange,
  transactions,
}) => {
  const renderPaymentMethod = (payment) => {
    if (payment && payment.method_details && payment.method_details.card) {
      return `${payment.method_details.card.type.toUpperCase()} ending in ${
        payment.method_details.card.last4
      }`;
    }
    return "N/A";
  };
  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <span>Credits</span>
          <a href="/#" onClick={() => onViewChange("Buy")}>
            Buy Credits
          </a>
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-success">
            Title Credits: {TitleCredits}
          </Card.Title>
          <Card.Text className="text-success">
            Website Credits: {WebsiteCredits}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mt-3">
        <Card.Header>Transactions:</Card.Header>
        <ListGroup variant="flush">
          {transactions.map((transaction, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center py-2"
            >
              <div className="text-primary">
                <strong>${transaction.totals.total}</strong> paid via{" "}
                {renderPaymentMethod(transaction.payment)} on {transaction.date}
                {/* Insert transaction date here */}
              </div>
              <div>
                <strong>Title Credits:</strong>{" "}
                {transaction.custom_data.title_credits},{" "}
                <strong>Website Credits:</strong>{" "}
                {transaction.custom_data.website_credits}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default MyCredits;
