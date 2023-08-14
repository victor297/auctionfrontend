import React, { useEffect } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
  getTotals,
} from "../slices/cartSlice";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreasedCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className='container pb-5'>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div>
          <p>Your Cart Is Curently Empty</p>
          <div>
            <Link to='/'>
              <span>Start Shopiing</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Row className='p-3'>
            <Row xs={5} className='text-start'>
              {" "}
              <Col>
                {" "}
                <h5>Product</h5>
              </Col>
              <Col className='ms-3'>
                <Button variant='warning' onClick={() => handleClearCart()}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Row>
          <Row className='products'>
            <Row className='m-auto'>
              {cart.cartItems?.map((cartItem) => (
                <Col
                  key={cartItem._id}
                  className='border-left p-3'
                  xs={4}
                  md={3}
                  lg={2}
                >
                  <Col>
                    <img
                      className=''
                      src={cartItem.image?.url}
                      alt={cartItem.name}
                      width='100%'
                      height='150px'
                    />
                    <Row>
                      <section>
                        <strong>{cartItem.name} </strong>
                        <Link className='text-warning text-decoration-none ms-1'>
                          ₦{cartItem.price}
                        </Link>
                      </section>
                    </Row>

                    <section>
                      <Button
                        variant='outline-warning'
                        size='sm'
                        onClick={() => handleRemoveFromCart(cartItem)}
                      >
                        Remove
                      </Button>
                    </section>
                  </Col>
                  {/* <Col xs={7} className='text-start'></Col> */}
                </Col>
              ))}
            </Row>
          </Row>
          <Row>
            <Col md={4} className='text-start'>
              <Row>
                <Row>
                  <Col>
                    <small>SubTotal</small>
                  </Col>
                  <Col>
                    <span>₦{cart.cartTotalAmount}</span>
                  </Col>
                </Row>

                <small>Fees calculated at checkout</small>

                {auth._id ? (
                  <Link to='/paystack'>
                    {" "}
                    <Button variant='warning'>Pay now</Button>
                  </Link>
                ) : (
                  <Button variant='warning' onClick={() => navigate("/login")}>
                    Login to Checkout
                  </Button>
                )}
                <div>
                  <Link to='/'>
                    <span>Start Shopiing</span>
                  </Link>
                </div>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Cart;
