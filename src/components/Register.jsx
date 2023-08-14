import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/");
      registerUser;
    }
  }, [auth._id, navigate]);
  const [user, setUser] = useState({
    name: "",
    userName: "",
    password: "",
  });

  const isUserNameValid = (userName) => {
    return /^(19\/|20D\/)/.test(userName); // Validates if it starts with "19/" or "20D/"
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isUserNameValid(user.userName)) {
      // If username is not in the correct format
      alert("please note auction is only available for final year students");
      return;
    }

    dispatch(registerUser(user));
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className='col-4 m-auto mt-5'>
        <h2>Register</h2>
        <Form.Group className='mb-3 mt-5'>
          <Form.Control
            className='mb-3'
            type='text'
            placeholder='name'
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <Form.Control
            className='mb-3'
            type='userName'
            placeholder='Matric Number'
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <Form.Control
            className='mb-3'
            type='password'
            placeholder='password'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <div className='d-grid'>
            <Button type='submit'>
              {auth.registerStatus === "pending" ? "Submitting" : "Register"}
            </Button>
          </div>
          {auth.registerStatus === "rejected" ? (
            <p className='text-start text-danger mt-2'>{auth.registerError}</p>
          ) : null}
        </Form.Group>
      </Form>
    </>
  );
};

export default Register;
