import React from "react";
import { Form, Row, Col, Card } from "react-bootstrap";

export function Signup({ onFormValueInput }) {
  return (
    <Card>
      <Card.Body>
        <Form>
          <Row className="mb-3">
            {/* First Column */}
            <Col md={6}>
              <Form.Group controlId="formFullname">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  name="_fullname"
                  type="text"
                  size="lg"
                  placeholder="Enter full name"
                  onChange={(e) => onFormValueInput(e)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="_email"
                  type="email"
                  size="lg"
                  placeholder="Enter email"
                  onChange={(e) => onFormValueInput(e)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Second Column */}
            <Col md={6}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="_password"
                  type="password"
                  size="lg"
                  placeholder="Password"
                  onChange={(e) => onFormValueInput(e)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBasicPassword2">
                <Form.Label>Retype Password</Form.Label>
                <Form.Control
                  name="_password2"
                  type="password"
                  size="lg"
                  placeholder="Password again"
                  onChange={(e) => onFormValueInput(e)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
