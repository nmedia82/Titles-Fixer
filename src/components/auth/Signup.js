import React from "react";
import { Form, Row, Col, Card } from "react-bootstrap";

export function Signup({ onFormValueInput }) {
  return (
        <Form className="">
          <Row className="mb-3">
            {/* First Column */}
            <Col md={12}>
              <Form.Group controlId="formFullname">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  name="_fullname"
                  type="text"
                  size="md"
                  placeholder="Enter full name"
                  onChange={(e) => onFormValueInput(e)}
                />
              </Form.Group>
            </Col>
            <Col md={12} className="mt-3">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="_email"
                  type="email"
                  size="md"
                  placeholder="Enter email here"
                  onChange={(e) => onFormValueInput(e)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Second Column */}
            <Col md={12}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="_password"
                  type="password"
                  size="md"
                  placeholder="Enter password here"
                  onChange={(e) => onFormValueInput(e)}
                />
              </Form.Group>
            </Col>
            <Col md={12} className="mt-3">
              <Form.Group controlId="formBasicPassword2">
                <Form.Label>Retype Password</Form.Label>
                <Form.Control
                  name="_password2"
                  type="password"
                  size="md"
                  placeholder="Enter password again"
                  onChange={(e) => onFormValueInput(e)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
  );
}
