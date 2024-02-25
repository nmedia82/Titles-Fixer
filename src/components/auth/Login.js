import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function Login({ onFormValueInput }) {
  return (
    <div className="">
      <h4 className="mb-3">Welcome back</h4>
      <Form.Group controlId="loginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          size="md"
          name="_email"
          type="email"
          placeholder="Enter email here"
          onChange={(e) => onFormValueInput(e)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mt-3 mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          size="md"
          name="_password"
          type="password"
          placeholder="Enter password here"
          onChange={(e) => onFormValueInput(e)}
        />
      </Form.Group>
    </div>
  );
}
