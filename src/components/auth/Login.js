import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function Login({ onFormValueInpu }) {
  return (
    <div>
      <Form.Group controlId="loginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="_email"
          type="email"
          placeholder="Enter email"
          onChange={(e) => onFormValueInpu(e)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mt-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="_password"
          type="password"
          placeholder="Password"
          onChange={(e) => onFormValueInpu(e)}
        />
      </Form.Group>
    </div>
  );
}