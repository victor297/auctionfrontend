import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { PaystackButton } from "react-paystack";
import { useSelector } from "react-redux";

const Paystack = () => {
  const publicKey = "pk_test_24f80340f75a34e90b00aa800e59608dfd6a0b06";

  const [email, setEmail] = useState("");
  const cart = useSelector((state) => state.cart);
  const totalAmount = cart.cartTotalAmount;
  const amount = totalAmount + totalAmount * 0.1;

  const componentProps = {
    email,
    amount,

    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  };

  return (
    <div className='App'>
      <div className='container'>
        <div className='item'>
          <img />
          <div className='item-details'>
            <strong className='text-warning'>Dancing Shoes</strong>
            <Row>
              <bold>Total amount: ₦{totalAmount}</bold>
            </Row>
            <p>Total amount + fees: ₦{amount}</p>
          </div>
        </div>
        <div className='checkout-form'>
          <Form>
            <Form.Control
              className='mb-3'
              type='text'
              id='email'
              placeholder='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form>
          <PaystackButton
            className='btn btn-outline-warning'
            {...componentProps}
          />
        </div>
      </div>
    </div>
  );
};

export default Paystack;
