import React, { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { Login } from "./Login";
import { Signup } from "./Signup";

function AuthForm({ onAuth }) {
  const [authData, setAuthData] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const auth_data = { ...authData, [key]: value };
    console.log(auth_data);
    setAuthData(auth_data);
  };

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <Form>
        {!isRegistered && <Login onFormValueInpu={handleInput} />}

        {isRegistered && <Signup onFormValueInpu={handleInput} />}

        {error && <Alert variant="danger">{error}</Alert>}

        <Button
          variant="primary"
          onClick={() => onAuth(authData)}
          className="mt-3"
        >
          Login
        </Button>
      </Form>

      <Row className="mt-3">
        <Col>
          <p>
            Don't have an account?{" "}
            <a href="#" onClick={() => setIsRegistered(!isRegistered)}>
              Signup
            </a>
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default AuthForm;
