import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../slices/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }
  }, [auth._id, navigate]);
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className=' col-sm-4 col-8  m-auto mt-5'>
        <h2>Login</h2>
        <Form.Group className='mb-3 mt-5'>
          <Form.Control
            className='mb-3'
            type='userName'
            placeholder='Enter your Matric Number'
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <Form.Control
            className='mb-3'
            type='password'
            placeholder='password'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <div className='d-grid'>
            <Button variant='dark' type='submit'>
              {auth.loginStatus === "pending" ? "Submitting" : "login"}
            </Button>
            <p>
              not registerd?{" "}
              <LinkContainer to='/register'>
                <strong className='text-warning'>signUp</strong>
              </LinkContainer>
            </p>
          </div>
          {auth.loginStatus === "rejected" ? (
            <p className='text-start text-danger mt-2'>{auth.loginError}</p>
          ) : null}
        </Form.Group>
      </Form>
    </>
  );
};

export default Login;
