import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function Signup({ onFormValueInput }) {
  return (
    <div>
      <Form.Group controlId="formFullname">
        <Form.Label>Full name</Form.Label>
        <Form.Control
          name="_fullname"
          type="text"
          placeholder="Enter full name"
          onChange={(e) => onFormValueInput(e)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail" className="mt-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="_email"
          type="email"
          placeholder="Enter email"
          onChange={(e) => onFormValueInput(e)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mt-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="_password"
          type="password"
          placeholder="Password"
          onChange={(e) => onFormValueInput(e)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword2" className="mt-3">
        <Form.Label>Retype Password</Form.Label>
        <Form.Control
          name="_password2"
          type="password"
          placeholder="Password again"
          onChange={(e) => onFormValueInput(e)}
        />
      </Form.Group>
    </div>
  );
}
