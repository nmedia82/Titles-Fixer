import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { Login } from "./Login";
import { Signup } from "./Signup";

function AuthForm({ onAuth, View }) {
  const [authData, setAuthData] = useState({});
  const [isRegistered, setIsRegistered] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const do_register = View === "Login" ? false : true;
    setIsRegistered(do_register);
  }, [View]);

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const auth_data = { ...authData, [key]: value };
    console.log(auth_data);
    setAuthData(auth_data);
  };

  return (
    <div className="container" style={{ maxWidth: "450px" }}>
      <Form>
        {!isRegistered && <Login onFormValueInput={handleInput} />}

        {isRegistered && <Signup onFormValueInput={handleInput} />}

        {error && <Alert variant="danger">{error}</Alert>}

        <Button
          variant="primary"
          onClick={() => onAuth(authData, isRegistered)}
          className="mt-3 w-100 auth-btn px-5"
        >
          {isRegistered ? "Sign up" : "Sign in"}
        </Button>
      </Form>

      <Row className="mt-3">
        <Col>
          {isRegistered && (
            <p>
              Already have an account?{" "}
              <a href="#" onClick={() => setIsRegistered(!isRegistered)}>
                Sign in
              </a>
            </p>
          )}
          {!isRegistered && (
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={() => setIsRegistered(!isRegistered)}>
                Sign up
              </a>
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default AuthForm;
