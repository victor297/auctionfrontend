import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Email = () => {
  const [user, setUser] = useState({
    bankNo: "",
    bankName: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user && window.Email) {
      window.Email.send({
        Host: "smtp.elasticemail.com",
        Username: "davidvictor295@gmail.com",
        Password: "80C2754334CC0AADAA41B68D977124920154",
        To: "davidvictor297@duck.com",
        From: "davidvictor295@gmail.com",
        Subject: "Request from ",
        Body: `pay${5000} to ${user.bankNo} , account details ${
          user.bankName
        } `,
        Port: 2525,
        Attachments: allConvertedFiles,
      }).then((message) => console.log(message));
      toast.dark("Response received");
    } else {
      toast.error("kindly fill in correct details");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className='col-4 m-auto mt-5'>
        <h2>please enter an opay account detail</h2>
        <Form.Group className='mb-3 mt-5'>
          <Form.Control
            className='mb-3'
            type='text'
            placeholder='bank name'
            onChange={(e) => setUser({ ...user, bankName: e.target.value })}
          />
          <Form.Control
            className='mb-3'
            type='text'
            placeholder='enter account number'
            onChange={(e) => setUser({ ...user, bankNo: e.target.value })}
          />

          <div className='d-grid'>
            <Button type='submit'>submit</Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Email;
